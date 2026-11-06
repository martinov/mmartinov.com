import { randomUUID } from "node:crypto";
import { expect, test, type Page } from "@playwright/test";
import { FAILED_REPLY_TO, sentEmails } from "../src/resend.ts";

const openContact = async (page: Page) => {
  await page.goto("/contact");
  await expect(page.locator("#confirm_email")).not.toHaveValue("");
};

const fillContact = async (page: Page, email = "visitor@example.test") => {
  const name = `Visitor ${randomUUID()}`;
  await page.getByLabel(/^Name/).fill(name);
  await page.getByLabel(/^Email/).fill(email);
  await page.getByLabel("Company").fill("Example Ltd");
  await page
    .getByLabel("Brief description")
    .fill("Please help automate reporting.");
  await page.getByLabel("Preferred time").fill("Monday morning");
  return name;
};

const submit = async (page: Page) => {
  // A freshly minted anti-spam token is deliberately rejected for three seconds.
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
};

const directEmailLink = (page: Page) =>
  page.locator("form").getByRole("link", { name: "me@mmartinov.com" });

test("delivers a Contact Submission by email", async ({ page }) => {
  await openContact(page);
  const name = await fillContact(page);
  await submit(page);

  await expect(
    page.getByRole("heading", { name: "Message Sent!" }),
  ).toBeVisible();
  const email = (await sentEmails()).find(
    (entry) =>
      entry.payload.subject === `New Contact: ${name} from Example Ltd`,
  );
  expect(email).toMatchObject({
    path: "/emails",
    authorization: "Bearer re_e2e_stub",
    payload: {
      from: "Martin Martinov Website <contact@notifications.mmartinov.com>",
      to: ["me@mmartinov.com"],
      reply_to: ["visitor@example.test"],
    },
  });
  expect(email?.payload.html).toContain("Please help automate reporting.");
  expect(email?.payload.html).toContain("Monday morning");
});

test("shows the direct-email fallback when Resend rejects a Contact Submission", async ({
  page,
}) => {
  await openContact(page);
  await fillContact(page, FAILED_REPLY_TO);
  await submit(page);

  await expect(page.locator("form")).toContainText(
    "Your message couldn't be sent. Please email me directly at",
  );
  await expect(directEmailLink(page)).toHaveAttribute(
    "href",
    "mailto:me@mmartinov.com",
  );
  await expect(
    page.getByRole("button", { name: "Send Message" }),
  ).toBeEnabled();
});

for (const invalid of ["empty name", "invalid email"] as const) {
  test(`rejects ${invalid} on the server`, async ({ page }) => {
    await openContact(page);
    const name = await fillContact(page);
    // Exercise server validation rather than the browser's constraint checks.
    await page.locator("form").evaluate((form: HTMLFormElement) => {
      form.noValidate = true;
    });
    if (invalid === "empty name") {
      await page.getByLabel(/^Name/).fill(" ");
    } else {
      await page.getByLabel(/^Email/).fill("invalid-email");
    }
    await submit(page);

    await expect(page.locator("form")).toContainText(
      "Please fill in your name, a valid email and a message.",
    );
    await expect(directEmailLink(page)).toHaveCount(0);
    expect(
      (await sentEmails()).some((entry) =>
        entry.payload.subject?.toString().includes(name),
      ),
    ).toBe(false);
  });
}

test("rejects a tampered anti-spam token without sending email", async ({
  page,
}) => {
  await openContact(page);
  const name = await fillContact(page);
  await page.locator("#confirm_email").fill("invalid-token");
  await submit(page);

  await expect(page.locator("form")).toContainText("Invalid submission");
  await expect(directEmailLink(page)).toHaveCount(0);
  expect(
    (await sentEmails()).some((entry) =>
      entry.payload.subject?.toString().includes(name),
    ),
  ).toBe(false);
});

test("rejects a filled honeypot without sending email", async ({ page }) => {
  await openContact(page);
  const name = await fillContact(page);
  await page.locator("#website").fill("https://spam.example");
  await submit(page);

  await expect(page.locator("form")).toContainText("Invalid submission");
  expect(
    (await sentEmails()).some((entry) =>
      entry.payload.subject?.toString().includes(name),
    ),
  ).toBe(false);
});

test("shows a retryable error when the Action request cannot reach the server", async ({
  page,
}) => {
  await openContact(page);
  await fillContact(page);
  await page.route("**/_actions/contact*", (route) => route.abort());
  await submit(page);

  await expect(page.locator("form")).toContainText(
    "Something went wrong. Please try again.",
  );
  await expect(directEmailLink(page)).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Send Message" }),
  ).toBeEnabled();
});

test("keeps the contact fallback inert while the server island is unavailable", async ({
  page,
}) => {
  await page.route("**/_server-islands/**", (route) => route.abort());
  await page.goto("/contact");

  await expect(page.locator("[inert]")).toBeVisible();
  await expect(page.locator("#confirm_email")).toHaveValue("");
  await expect(page.getByRole("link", { name: "Book a Call" })).toBeVisible();
});
