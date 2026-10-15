import { ActionError, defineAction } from "astro:actions";
import { ANTISPAM_SECRET_KEY, RESEND_API_KEY } from "astro:env/server";
import { validateSubmission } from "../lib/antispam.ts";
import { buildContactEmail, contactInput } from "../lib/contact.ts";

const RESEND_API_URL = "https://api.resend.com/emails";

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactInput,
    handler: async (input) => {
      const spamCheck = await validateSubmission(
        input.confirm_email,
        input.website,
        ANTISPAM_SECRET_KEY,
      );

      if (!spamCheck.valid) {
        console.log("Anti-spam check failed:", spamCheck.reason);
        throw new ActionError({
          code: "BAD_REQUEST",
          message: spamCheck.error,
        });
      }

      // Passed the anti-spam checks: this is now a Contact Submission
      const submission = input;
      const email = buildContactEmail(submission, new Date());

      // Only a failed Resend request maps to BAD_GATEWAY; anything else
      // thrown here surfaces as INTERNAL_SERVER_ERROR
      let response: Response;
      try {
        response = await fetch(RESEND_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Resend API error:", response.status, errorData);
          throw new Error("Failed to send email");
        }
      } catch (emailSendError) {
        console.error("Error sending email via Resend:", emailSendError);

        // With no storage, this log line is the only copy of the submission
        console.log("Contact form submission (email failed):", {
          timestamp: new Date().toISOString(),
          name: submission.name,
          email: submission.email,
          company: submission.company || "N/A",
          message: submission.message,
          preferredTime: submission.preferredTime || "N/A",
        });

        // Tell the visitor it wasn't sent so they can email directly (#19).
        // The form shows the fallback address only for BAD_GATEWAY. Resend's
        // details stay in the logs.
        throw new ActionError({
          code: "BAD_GATEWAY",
          message: "Your message could not be sent",
        });
      }

      // The email went out; a body we can't parse only affects this log line
      const emailData = await response.json().catch(() => null);
      console.log("Contact form email sent successfully:", emailData);
    },
  }),
};
