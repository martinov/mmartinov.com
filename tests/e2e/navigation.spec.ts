import { expect, test } from "@playwright/test";

for (const [name, path] of [
  ["Audit", "/audit"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const) {
  test(`header navigation reaches ${name} and returns home`, async ({
    page,
  }) => {
    await page.goto("/");
    const navigation = page.locator("header").getByRole("navigation");
    await navigation.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(page.locator("main h1")).toBeVisible();

    await navigation.getByRole("link", { name: "Home", exact: true }).click();
    await expect(page).toHaveURL("/");
  });
}

test("header marks only the current page's link with aria-current", async ({
  page,
}) => {
  await page.goto("/work");
  const navigation = page.locator("header").getByRole("navigation");
  await expect(navigation.locator("[aria-current]")).toHaveCount(1);
  await expect(
    navigation.getByRole("link", { name: "Work", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("footer headings do not skip a level on the 404 page", async ({
  page,
}) => {
  await page.goto("/no-such-page");
  await expect(page.locator("footer h3")).toHaveCount(0);
  await expect(
    page.locator("footer").getByRole("heading", { level: 2 }),
  ).toHaveCount(2);
});
