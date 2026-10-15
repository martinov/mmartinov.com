import { defineConfig, envField, fontProviders } from "astro/config";
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
  // Self-hosted from /_astro/ at build time; no requests to Google at runtime
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      weights: [400, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
      options: { experimental: { variableAxis: { opsz: [["6", "72"]] } } },
    },
    {
      provider: fontProviders.google(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "sans-serif",
      ],
      options: { experimental: { variableAxis: { opsz: [["9", "40"]] } } },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    // In dev, @preact/preset-vite injects `import "preact/devtools"` into hook
    // components but only pre-bundles it for the client. Without this, SSR
    // discovers it mid-request on a cold cache, re-optimizes, and the reload
    // leaves two Preact instances: "Cannot read properties of undefined
    // (reading '__H')".
    environments: {
      ssr: {
        optimizeDeps: { include: ["preact/devtools"] },
      },
    },
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
