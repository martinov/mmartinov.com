import { z } from "astro/zod";

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
