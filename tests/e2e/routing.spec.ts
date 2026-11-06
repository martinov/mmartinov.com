import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/about", "/work", "/audit", "/contact"] as const;

for (const path of ROUTES) {
  test(`${path} serves a page with its canonical URL`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://mmartinov.com${path}`,
    );
  });
}

test("an unknown URL returns the custom 404 page", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.locator("main").getByRole("link", { name: /home/i }),
  ).toHaveAttribute("href", "/");
});

test("robots.txt advertises a sitemap containing every page and no 404", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(
    "https://mmartinov.com/sitemap-index.xml",
  );

  const index = await request.get("/sitemap-index.xml");
  expect(index.status()).toBe(200);
  const sitemapUrl = (await index.text()).match(/<loc>([^<]+)<\/loc>/)?.[1];
  expect(sitemapUrl).toBeTruthy();
  const sitemap = await request.get(new URL(sitemapUrl!).pathname);
  expect(sitemap.status()).toBe(200);
  const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => new URL(match[1]!).pathname.replace(/\/$/, "") || "/")
    .sort();
  expect(paths).toEqual([...ROUTES].sort());
});
