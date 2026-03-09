import { define } from "../utils.ts";
import { navigation, siteConfig } from "../content/site.ts";

function generateSitemap() {
  const baseUrl = siteConfig.url;

  // Get current date in ISO format for lastmod
  const lastModified = new Date().toISOString().split("T")[0];

  // Build URLs from navigation
  const urls = navigation.map((item) => {
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
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const handler = define.handlers({
  GET() {
    const sitemap = generateSitemap();

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  },
  HEAD() {
    return new Response(null, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
});
