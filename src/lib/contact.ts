import type { ActionErrorCode } from "astro:actions";
import { z } from "astro/zod";
import { tokenProblem } from "./antispam.ts";

/** Resend's send-email endpoint, unless RESEND_API_URL overrides it. */
export const DEFAULT_RESEND_API_URL = "https://api.resend.com/emails";

export const contactInput = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  company: z.string().trim().optional(),
  message: z.string().trim().min(1),
  preferredTime: z.string().trim().optional(),
  website: z.string().optional(),
  confirm_email: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactInput>;

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const escapeMultiline = (text: string) =>
  escapeHtml(text).replace(/\n/g, "<br>");

export const buildContactEmail = (input: ContactInput, receivedAt: Date) => {
  const { name, email, company, message, preferredTime } = input;
  // RFC 6068: the "@" must stay literal
  const mailto = `mailto:${email.split("@").map(encodeURIComponent).join("@")}`;

  return {
    from: "Martin Martinov Website <contact@notifications.mmartinov.com>",
    to: ["me@mmartinov.com"],
    reply_to: [email],
    subject: `New Contact: ${name}${company ? ` from ${company}` : ""}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #111827; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #374151; margin-bottom: 5px; }
            .value { color: #1f2937; }
            .message-box { background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #111827; margin-top: 10px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #d1d5db; color: #6b7280; font-size: 14px; }
            .reply-button { display: inline-block; background-color: #111827; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value"><strong>${escapeMultiline(name)}</strong></div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="${escapeHtml(mailto)}">${escapeHtml(email)}</a></div>
              </div>

              ${
                company
                  ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${escapeMultiline(company)}</div>
              </div>
              `
                  : ""
              }

              ${
                preferredTime
                  ? `
              <div class="field">
                <div class="label">Preferred Time for Call:</div>
                <div class="value">${escapeMultiline(preferredTime)}</div>
              </div>
              `
                  : ""
              }

              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">
                  ${escapeMultiline(message)}
                </div>
              </div>

              <a href="${escapeHtml(mailto)}" class="reply-button">Reply to ${escapeMultiline(name)}</a>

              <div class="footer">
                <p>Received: ${receivedAt.toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                  timeZone: "Europe/Sofia",
                })}</p>
                <p>Submitted via mmartinov.com contact form</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
};

/**
 * Every way a submission with valid fields fails, with the status and message
 * the Action reports it with. BAD_GATEWAY is the one the form answers with the
 * direct-email fallback.
 */
export const CONTACT_ERRORS = {
  invalid_submission: { code: "BAD_REQUEST", message: "Invalid submission" },
  expired: {
    code: "BAD_REQUEST",
    message: "Form expired. Please refresh the page and try again.",
  },
  too_fast: {
    code: "BAD_REQUEST",
    message: "Please take your time filling out the form.",
  },
  rate_limited: {
    code: "TOO_MANY_REQUESTS",
    message: "Too many messages. Please wait a minute and try again.",
  },
  send_failed: {
    code: "BAD_GATEWAY",
    message: "Your message could not be sent",
  },
} as const satisfies Record<
  string,
  { readonly code: ActionErrorCode; readonly message: string }
>;

export type ContactError = keyof typeof CONTACT_ERRORS;

export type ContactResult =
  { readonly ok: true } | { readonly ok: false; readonly error: ContactError };

/** The Workers Rate Limiting binding, or a stand-in for it. */
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface ContactDependencies {
  /** Key the anti-spam token was signed with. */
  readonly secret: string;
  readonly apiKey: string;
  readonly resendUrl: string;
  readonly limiter: RateLimiter;
  /** The visitor's IP (`CF-Connecting-IP`), the rate limit's key. */
  readonly ip: string;
  readonly now: () => number;
  readonly fetch: typeof fetch;
}

const fail = (error: ContactError): ContactResult => ({ ok: false, error });

/** Rate limit errors let the request through: a fault never blocks a visitor. */
const isRateLimited = async (limiter: RateLimiter, ip: string) => {
  try {
    const { success } = await limiter.limit({ key: ip });
    return !success;
  } catch (e) {
    console.error("Rate limiting unavailable:", e);
    return false;
  }
};

/**
 * Handles one contact form submission whose fields the Action's `contactInput`
 * schema has already accepted, in order: honeypot, anti-spam token, rate
 * limit, then sending the email through Resend.
 */
export const submitContact = async (
  input: ContactInput,
  deps: ContactDependencies,
): Promise<ContactResult> => {
  if (input.website) {
    console.log("Anti-spam check failed: honeypot_filled");
    return fail("invalid_submission");
  }

  const now = deps.now();
  const problem = await tokenProblem(input.confirm_email, deps.secret, now);
  if (problem) {
    console.log("Anti-spam check failed:", problem);
    if (problem === "too_fast") return fail("too_fast");
    if (problem === "token_expired") return fail("expired");
    return fail("invalid_submission");
  }

  if (await isRateLimited(deps.limiter, deps.ip)) return fail("rate_limited");

  const email = buildContactEmail(input, new Date(now));
  // Called unbound: the Workers runtime rejects fetch with a `this` of deps
  const send = deps.fetch;
  try {
    const response = await send(deps.resendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${deps.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    if (response.ok) return { ok: true };
    console.error(
      "Resend API error:",
      response.status,
      await response.text().catch(() => ""),
    );
  } catch (e) {
    console.error("Error sending email via Resend:", e);
  }

  // With no storage, this log line is the only copy of the submission
  console.log("Contact form submission (email failed):", {
    timestamp: new Date(now).toISOString(),
    name: input.name,
    email: input.email,
    company: input.company || "N/A",
    message: input.message,
    preferredTime: input.preferredTime || "N/A",
  });
  return fail("send_failed");
};
