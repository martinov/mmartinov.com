import { ActionError, defineAction } from "astro:actions";
import { validateSubmission } from "../lib/antispam.ts";
import { buildContactEmail, contactInput } from "../lib/contact.ts";

const RESEND_API_URL = "https://api.resend.com/emails";

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactInput,
    handler: async (input) => {
      // Imported lazily: ContactForm imports astro:actions, which loads this
      // module while /contact is prerendered, where the secrets don't exist
      const { ANTISPAM_SECRET_KEY, RESEND_API_KEY } =
        await import("astro:env/server");
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

      const email = buildContactEmail(input, new Date());

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
          name: input.name,
          email: input.email,
          company: input.company || "N/A",
          message: input.message,
          preferredTime: input.preferredTime || "N/A",
        });

        throw new ActionError({
          code: "BAD_GATEWAY",
          message: "Your message could not be sent",
        });
      }

      const emailData = await response.json().catch(() => null);
      console.log("Contact form email sent successfully:", emailData);
    },
  }),
};
