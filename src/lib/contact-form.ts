import { isInputError, type ActionError } from "astro:actions";

export const GENERIC_ERROR = "Something went wrong. Please try again.";

export interface FormError {
  message: string;
  // Email delivery failed upstream: offer the direct address instead
  sendFailed: boolean;
}

export const toFormError = (error: ActionError): FormError => {
  if (isInputError(error)) {
    return {
      message: "Please fill in your name, a valid email and a message.",
      sendFailed: false,
    };
  }
  if (error.code === "BAD_GATEWAY") {
    return { message: error.message, sendFailed: true };
  }
  if (error.code === "BAD_REQUEST") {
    // Anti-spam rejection; its message is written for visitors
    return { message: error.message, sendFailed: false };
  }
  return { message: GENERIC_ERROR, sendFailed: false };
};

/** Outcome of a native (no-JS) form POST, rendered by the server. */
export type ServerResult =
  | { status: "success" }
  | (FormError & { status: "error"; values: Record<string, string> });
