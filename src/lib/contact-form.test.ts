import { describe, expect, it } from "vitest";
import { GENERIC_ERROR, toFormError } from "./contact-form.ts";

const inputError = { code: "BAD_REQUEST", message: "Failed to validate" };

describe("toFormError", () => {
  it("puts an invalid email on the email field, with no banner", () => {
    expect(
      toFormError(inputError, { email: ["Invalid email address"] }),
    ).toEqual({
      message: "",
      sendFailed: false,
      fields: { email: "Please enter a valid email address." },
    });
  });

  it("reports every invalid field", () => {
    const { fields } = toFormError(inputError, {
      name: ["Too small"],
      email: ["Invalid email address"],
      message: ["Too small"],
    });
    expect(fields).toEqual({
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      message: "Please enter a message.",
    });
  });

  it("falls back to the banner when no visible field is at fault", () => {
    expect(
      toFormError(inputError, { confirm_email: ["Invalid input"] }),
    ).toEqual({
      message: "Please fill in your name, a valid email and a message.",
      sendFailed: false,
      fields: {},
    });
  });

  it("offers the direct-email fallback only for a delivery failure", () => {
    expect(
      toFormError({
        code: "BAD_GATEWAY",
        message: "Your message could not be sent",
      }),
    ).toEqual({
      message: "Your message could not be sent",
      sendFailed: true,
      fields: {},
    });
  });

  it("shows an anti-spam rejection in the banner", () => {
    expect(
      toFormError({ code: "BAD_REQUEST", message: "Invalid submission" }),
    ).toEqual({ message: "Invalid submission", sendFailed: false, fields: {} });
  });

  it("hides the detail of an unexpected error", () => {
    expect(
      toFormError({ code: "INTERNAL_SERVER_ERROR", message: "boom" }),
    ).toEqual({ message: GENERIC_ERROR, sendFailed: false, fields: {} });
  });
});
