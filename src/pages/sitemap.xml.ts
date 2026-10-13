import type { APIRoute } from "astro";
import { navigation, siteConfig } from "../content/site.ts";

// Generated at build time and served as a static asset (GET and HEAD)
export const prerender = true;

function generateSitemap() {
  const baseUrl = siteConfig.url;

  // Get current date in ISO format for lastmod
  const lastModified = new Date().toISOString().split("T")[0];

  // Build URLs from navigation
  const urls = navigation
    .map((item) => {
      // Determine priority and change frequency based on page
      let priority = "0.8";
      let changefreq = "monthly";

      if (item.href === "/") {
        priority = "1.0";
        changefreq = "weekly";
      } else if (item.href === "/work" || item.href === "/contact") {
        priority = "0.9";
        changefreq = "weekly";
      }

      return `  <url>
    <loc>${baseUrl}${item.href}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const GET: APIRoute = () =>
  new Response(generateSitemap(), {
    headers: { "Content-Type": "application/xml" },
  });
