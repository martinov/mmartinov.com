/**
 * Anti-spam utilities using signed tokens and honeypot validation.
 *
 * This module provides stateless anti-spam protection that works on
 * distributed deployments like Cloudflare Workers without requiring sessions.
 * The signing secret is passed in by the caller (from astro:env).
 */

// Token validity duration (1 hour)
const TOKEN_VALIDITY_MS = 60 * 60 * 1000;

// Minimum time to fill form (3 seconds)
const MIN_FORM_TIME_MS = 3000;

/**
 * Generate a cryptographic signature for data using HMAC-SHA256
 */
const sign = async (data: string, secret: string): Promise<string> => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));

  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};

/**
 * Verify a signature matches the expected data
 */
const verify = async (
  data: string,
  signature: string,
  secret: string,
): Promise<boolean> => {
  const expectedSignature = await sign(data, secret);
  return signature === expectedSignature;
};

/**
 * Generate a signed anti-spam token.
 * Format: base64(timestamp).base64(signature)
 *
 * The token encodes when it was created, allowing the server to:
 * 1. Verify the token wasn't tampered with (signature check)
 * 2. Verify the token isn't too old (timestamp check)
 * 3. Verify enough time passed before submission (timing check)
 */
export const generateToken = async (secret: string): Promise<string> => {
  const timestamp = Date.now().toString();
  const signature = await sign(timestamp, secret);
  return `${btoa(timestamp)}.${signature}`;
};

/**
 * Validation result with specific error information
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  reason?:
    | "honeypot_filled"
    | "missing_token"
    | "invalid_token_format"
    | "invalid_signature"
    | "token_expired"
    | "submitted_too_fast";
}

/**
 * Validate an anti-spam token and check honeypot.
 *
 * @param token - The token from the confirm_email field
 * @param honeypotValue - The value from the website honeypot field
 * @param secret - The HMAC key the token was signed with
 * @returns Validation result with error details if invalid
 */
export const validateSubmission = async (
  token: string | undefined,
  honeypotValue: string | undefined,
  secret: string,
): Promise<ValidationResult> => {
  // Check honeypot first (should be empty)
  if (honeypotValue) {
    return {
      valid: false,
      error: "Invalid submission",
      reason: "honeypot_filled",
    };
  }

  // Token is required
  if (!token) {
    return {
      valid: false,
      error: "Invalid submission",
      reason: "missing_token",
    };
  }

  // Parse token format: base64(timestamp).signature
  const parts = token.split(".");
  if (parts.length !== 2) {
    return {
      valid: false,
      error: "Invalid submission",
      reason: "invalid_token_format",
    };
  }

  const [encodedTimestamp, signature] = parts;

  // Decode timestamp
  let timestamp: number;
  try {
    timestamp = parseInt(atob(encodedTimestamp), 10);
    if (isNaN(timestamp)) throw new Error("Invalid timestamp");
  } catch {
    return {
      valid: false,
      error: "Invalid submission",
      reason: "invalid_token_format",
    };
  }

  // Verify signature
  const isValidSignature = await verify(
    timestamp.toString(),
    signature,
    secret,
  );

  if (!isValidSignature) {
    return {
      valid: false,
      error: "Invalid submission",
      reason: "invalid_signature",
    };
  }

  const now = Date.now();

  // Check token isn't expired (older than 1 hour)
  if (now - timestamp > TOKEN_VALIDITY_MS) {
    return {
      valid: false,
      error: "Form expired. Please refresh the page and try again.",
      reason: "token_expired",
    };
  }

  // Check minimum time elapsed (at least 3 seconds)
  if (now - timestamp < MIN_FORM_TIME_MS) {
    return {
      valid: false,
      error: "Please take your time filling out the form.",
      reason: "submitted_too_fast",
    };
  }

  return { valid: true };
};
