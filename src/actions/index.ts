import { ActionError, defineAction } from "astro:actions";
import {
  CONTACT_ERRORS,
  contactInput,
  DEFAULT_RESEND_API_URL,
  submitContact,
} from "../lib/contact.ts";

export const server = {
  contact: defineAction({
    accept: "form",
    // Astro rejects invalid fields before the handler runs, so they reach
    // neither the rate limiter nor Resend
    input: contactInput,
    handler: async (input, context) => {
      // Imported lazily: ContactForm imports astro:actions, which loads this
      // module while /contact is prerendered, where the secrets don't exist
      const { ANTISPAM_SECRET_KEY, RESEND_API_KEY, RESEND_API_URL } =
        await import("astro:env/server");
      const { env } = await import("cloudflare:workers");

      const result = await submitContact(input, {
        secret: ANTISPAM_SECRET_KEY,
        apiKey: RESEND_API_KEY,
        resendUrl: RESEND_API_URL || DEFAULT_RESEND_API_URL,
        limiter: env.CONTACT_LIMITER,
        ip: context.request.headers.get("CF-Connecting-IP") ?? "unknown",
        now: Date.now,
        fetch,
      });

      if (!result.ok) throw new ActionError(CONTACT_ERRORS[result.error]);
    },
  }),
};
