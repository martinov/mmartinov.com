/**
 * Signed, timestamped anti-spam tokens: `base64(timestamp).base64(hmac)`.
 * The contact server island signs one per page view and the form sends it
 * back in the `confirm_email` field, which only JavaScript fills. The secret
 * is passed in by the caller, so this module never touches the environment.
 */

/** A token older than this has expired. */
const MAX_AGE_MS = 60 * 60 * 1000;

/** A human needs at least this long to fill in the form. */
const MIN_AGE_MS = 3000;

export type TokenProblem =
  | "missing_token"
  | "invalid_format"
  | "invalid_signature"
  | "token_expired"
  | "too_fast";

const encoder = new TextEncoder();

const sign = async (value: string, secret: string): Promise<string> => {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value),
  );
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};

/** Compares in time independent of where the strings differ. */
const constantTimeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return difference === 0;
};

/** A token signed at `now` (milliseconds since the epoch). */
export const generateToken = async (
  secret: string,
  now: number,
): Promise<string> => {
  const timestamp = now.toString();
  return `${btoa(timestamp)}.${await sign(timestamp, secret)}`;
};

const decodeTimestamp = (encoded: string): number | null => {
  try {
    const timestamp = Number.parseInt(atob(encoded), 10);
    return Number.isNaN(timestamp) ? null : timestamp;
  } catch {
    return null;
  }
};

/** What is wrong with `token` at `now`, or null when it is acceptable. */
export const tokenProblem = async (
  token: string | undefined,
  secret: string,
  now: number,
): Promise<TokenProblem | null> => {
  if (!token) return "missing_token";

  const parts = token.split(".");
  if (parts.length !== 2) return "invalid_format";
  const [encodedTimestamp, signature] = parts as [string, string];

  const timestamp = decodeTimestamp(encodedTimestamp);
  if (timestamp === null) return "invalid_format";

  const expected = await sign(timestamp.toString(), secret);
  if (!constantTimeEqual(signature, expected)) return "invalid_signature";

  const age = now - timestamp;
  if (age > MAX_AGE_MS) return "token_expired";
  if (age < MIN_AGE_MS) return "too_fast";
  return null;
};
