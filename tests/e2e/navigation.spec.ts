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
