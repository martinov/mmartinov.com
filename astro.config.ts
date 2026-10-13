import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://mmartinov.com",
  // No Astro sessions or astro:assets here, so skip the SESSION KV and IMAGES bindings
  adapter: cloudflare({ imageService: "passthrough" }),
  session: false,
  // Emit about.html (not about/index.html) so Cloudflare serves /about without
  // redirecting to /about/, matching the canonical URLs and sitemap
  build: { format: "file" },
  trailingSlash: "never",
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      ANTISPAM_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
