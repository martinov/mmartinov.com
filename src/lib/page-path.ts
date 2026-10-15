// With build.format: "file", prerendered pages see Astro.url.pathname as
// "/about.html" or "/index.html", while SSR routes see "/contact". Normalize
// to the extensionless path the site is served under.
export const pagePath = (url: URL): string =>
  url.pathname.replace(/(?:\/index)?\.html$/, "") || "/";
