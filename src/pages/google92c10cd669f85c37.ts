import type { APIRoute } from "astro";

// Google Search Console verification file, answering 200 at
// /google92c10cd669f85c37.html. Served on demand rather than as a static asset
// because Cloudflare's asset routing redirects *.html to the extensionless path.
// The route has no .html suffix because build.format "file" makes Astro strip
// .html from request paths before matching.
export const prerender = false;

export const GET: APIRoute = () =>
  new Response("google-site-verification: google92c10cd669f85c37.html", {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
