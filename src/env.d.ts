// Bindings from wrangler.jsonc, read with `import { env } from "cloudflare:workers"`
declare module "cloudflare:workers" {
  export const env: {
    readonly CONTACT_LIMITER: import("./lib/contact.ts").RateLimiter;
  };
}
