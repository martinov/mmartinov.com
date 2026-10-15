import { describe, expect, it } from "vitest";
import { buildContactEmail, contactInput } from "./contact.ts";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello",
  confirm_email: "token",
};

describe("contactInput", () => {
  it("rejects an email address carrying HTML markup", () => {
    const result = contactInput.safeParse({
      ...valid,
      email: 'a"><b>x</b>@x.co',
    });
    expect(result.success).toBe(false);
  });

  it("accepts a submission without the optional fields", () => {
    expect(contactInput.safeParse(valid).success).toBe(true);
  });

  it.each(["name", "message"])("rejects a blank %s", (field) => {
    const result = contactInput.safeParse({ ...valid, [field]: "   " });
    expect(result.success).toBe(false);
  });
});

const receivedAt = new Date("2026-10-15T09:30:00Z");

describe("buildContactEmail", () => {
  it("renders markup in the email address as literal text", () => {
    const { html } = buildContactEmail(
      { ...valid, email: 'a"><b>x</b>@x.co' },
      receivedAt,
    );
    expect(html).not.toContain("<b>x</b>");
    expect(html).not.toContain('a">');
    expect(html).toContain("a&quot;&gt;&lt;b&gt;x&lt;/b&gt;@x.co");
  });

  it("links a normal address with a working mailto", () => {
    const { html } = buildContactEmail(valid, receivedAt);
    expect(html).toContain('href="mailto:ada@example.com"');
  });

  it("keeps mailto parameters in the address from reaching the link", () => {
    const { html } = buildContactEmail(
      { ...valid, email: "a?cc=evil@x.co" },
      receivedAt,
    );
    expect(html).toContain('href="mailto:a%3Fcc%3Devil@x.co"');
  });

  it("sends from the verified domain to Martin, replying to the visitor", () => {
    const email = buildContactEmail({ ...valid, company: "Acme" }, receivedAt);
    expect(email).toMatchObject({
      from: "Martin Martinov Website <contact@notifications.mmartinov.com>",
      to: ["me@mmartinov.com"],
      reply_to: ["ada@example.com"],
      subject: "New Contact: Ada Lovelace from Acme",
    });
  });
});
