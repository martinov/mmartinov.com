import { describe, expect, it, vi } from "vitest";
import { generateToken } from "./antispam.ts";
import {
  buildContactEmail,
  contactInput,
  submitContact,
  type ContactDependencies,
  type ContactInput,
} from "./contact.ts";

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

const SECRET = "test-secret";
const LOADED_AT = Date.UTC(2026, 9, 15, 9, 30, 0);
const SECOND = 1000;
const HOUR = 60 * 60 * SECOND;

const submission = async (
  fields: Partial<ContactInput> = {},
): Promise<ContactInput> => ({
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello",
  website: "",
  confirm_email: await generateToken(SECRET, LOADED_AT),
  ...fields,
});

const dependencies = (overrides: Partial<ContactDependencies> = {}) => {
  const limit = vi.fn(async () => ({ success: true }));
  const send = vi.fn(async () => new Response("{}", { status: 200 }));
  const deps: ContactDependencies = {
    secret: SECRET,
    apiKey: "re_test",
    resendUrl: "http://email.invalid/emails",
    ip: "203.0.113.7",
    now: () => LOADED_AT + 10 * SECOND,
    limiter: { limit },
    fetch: send,
    ...overrides,
  };
  return { deps, limit, send };
};

describe("submitContact", () => {
  it("emails an accepted submission through Resend", async () => {
    const { deps, limit, send } = dependencies();

    const result = await submitContact(
      await submission({ company: "Acme", preferredTime: "Monday" }),
      deps,
    );

    expect(result).toEqual({ ok: true });
    expect(limit).toHaveBeenCalledWith({ key: "203.0.113.7" });
    expect(send).toHaveBeenCalledOnce();
    const [url, init] = send.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("http://email.invalid/emails");
    expect(init.headers).toMatchObject({ Authorization: "Bearer re_test" });
    expect(JSON.parse(init.body as string)).toMatchObject({
      to: ["me@mmartinov.com"],
      reply_to: ["ada@example.com"],
      subject: "New Contact: Ada Lovelace from Acme",
    });
  });

  it.each([
    ["a filled honeypot", { website: "https://spam.example" }],
    ["a missing token", { confirm_email: "" }],
    ["a malformed token", { confirm_email: "not-a-token" }],
    ["a token with no timestamp", { confirm_email: `${btoa("soon")}.c2ln` }],
  ])("rejects %s as an invalid submission", async (_, fields) => {
    const { deps, limit, send } = dependencies();

    const result = await submitContact(await submission(fields), deps);

    expect(result).toEqual({ ok: false, error: "invalid_submission" });
    expect(limit).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects a token signed with another key", async () => {
    const { deps, limit, send } = dependencies();
    const forged = await generateToken("another-secret", LOADED_AT);

    const result = await submitContact(
      await submission({ confirm_email: forged }),
      deps,
    );

    expect(result).toEqual({ ok: false, error: "invalid_submission" });
    expect(limit).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects a token whose timestamp was changed", async () => {
    const { deps, send } = dependencies();
    const [, signature] = (await generateToken(SECRET, LOADED_AT)).split(".");
    const backdated = `${btoa((LOADED_AT - 10 * SECOND).toString())}.${signature}`;

    const result = await submitContact(
      await submission({ confirm_email: backdated }),
      deps,
    );

    expect(result).toEqual({ ok: false, error: "invalid_submission" });
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ["under 3 seconds after", 3 * SECOND - 1, "too_fast"],
    ["over an hour after", HOUR + 1, "expired"],
  ])("rejects a submission %s the form loaded", async (_, age, error) => {
    const { deps, limit, send } = dependencies({ now: () => LOADED_AT + age });

    const result = await submitContact(await submission(), deps);

    expect(result).toEqual({ ok: false, error });
    expect(limit).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ["3 seconds", 3 * SECOND],
    ["an hour", HOUR],
  ])(
    "accepts a submission exactly %s after the form loaded",
    async (_, age) => {
      const { deps } = dependencies({ now: () => LOADED_AT + age });

      expect(await submitContact(await submission(), deps)).toEqual({
        ok: true,
      });
    },
  );

  it("turns a rate-limited visitor away without sending email", async () => {
    const { deps, send } = dependencies({
      limiter: { limit: async () => ({ success: false }) },
    });

    const result = await submitContact(await submission(), deps);

    expect(result).toEqual({ ok: false, error: "rate_limited" });
    expect(send).not.toHaveBeenCalled();
  });

  it("lets the submission through when the rate limiter errors", async () => {
    const { deps, send } = dependencies({
      limiter: {
        limit: async () => {
          throw new Error("binding unavailable");
        },
      },
    });

    const result = await submitContact(await submission(), deps);

    expect(result).toEqual({ ok: true });
    expect(send).toHaveBeenCalledOnce();
  });

  it("reports a delivery failure when Resend rejects the email", async () => {
    const { deps } = dependencies({
      fetch: async () => new Response("{}", { status: 503 }),
    });

    const result = await submitContact(await submission(), deps);

    expect(result).toEqual({ ok: false, error: "send_failed" });
  });

  it("reports a delivery failure when Resend cannot be reached", async () => {
    const { deps } = dependencies({
      fetch: async () => {
        throw new TypeError("fetch failed");
      },
    });

    const result = await submitContact(await submission(), deps);

    expect(result).toEqual({ ok: false, error: "send_failed" });
  });
});
