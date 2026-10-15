import type { APIRoute } from "astro";
import { ANTISPAM_SECRET_KEY, RESEND_API_KEY } from "astro:env/server";
import { validateSubmission } from "../../lib/antispam.ts";

export const prerender = false;

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  preferredTime?: string;
  // Anti-spam fields
  website?: string;
  confirm_email?: string;
}

// Resend API configuration
const RESEND_API_URL = "https://api.resend.com/emails";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();

    // Anti-spam validation (server-side)
    const spamCheck = await validateSubmission(
      data.confirm_email,
      data.website,
      ANTISPAM_SECRET_KEY,
    );

    if (!spamCheck.valid) {
      console.log("Anti-spam check failed:", spamCheck.reason);
      return new Response(JSON.stringify({ error: spamCheck.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitize message to prevent XSS in email
    const sanitizeHtml = (text: string) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\n/g, "<br>");

    // Send email via Resend REST API
    try {
      const emailPayload = {
        from: "Martin Martinov Website <contact@notifications.mmartinov.com>",
        to: ["me@mmartinov.com"],
        reply_to: [data.email],
        subject: `New Contact: ${data.name}${
          data.company ? ` from ${data.company}` : ""
        }`,
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
                    <div class="value"><strong>${sanitizeHtml(
                      data.name,
                    )}</strong></div>
                  </div>

                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                  </div>

                  ${
                    data.company
                      ? `
                  <div class="field">
                    <div class="label">Company:</div>
                    <div class="value">${sanitizeHtml(data.company)}</div>
                  </div>
                  `
                      : ""
                  }

                  ${
                    data.preferredTime
                      ? `
                  <div class="field">
                    <div class="label">Preferred Time for Call:</div>
                    <div class="value">${sanitizeHtml(data.preferredTime)}</div>
                  </div>
                  `
                      : ""
                  }

                  <div class="field">
                    <div class="label">Message:</div>
                    <div class="message-box">
                      ${sanitizeHtml(data.message)}
                    </div>
                  </div>

                  <a href="mailto:${data.email}" class="reply-button">Reply to ${sanitizeHtml(
                    data.name,
                  )}</a>

                  <div class="footer">
                    <p>Received: ${new Date().toLocaleString("en-US", {
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

      const response = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Resend API error:", response.status, errorData);
        throw new Error("Failed to send email");
      }

      const emailData = await response.json();
      console.log("Contact form email sent successfully:", emailData);
    } catch (emailSendError) {
      console.error("Error sending email via Resend:", emailSendError);

      // With no storage, this log line is the only copy of the submission
      console.log("Contact form submission (email failed):", {
        timestamp: new Date().toISOString(),
        name: data.name,
        email: data.email,
        company: data.company || "N/A",
        message: data.message,
        preferredTime: data.preferredTime || "N/A",
      });

      // Tell the visitor it wasn't sent so they can email directly (#19).
      // 502 marks an upstream failure; the island shows the fallback address
      // only for this status. Resend's details stay in the logs.
      return new Response(
        JSON.stringify({ error: "Your message could not be sent" }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
