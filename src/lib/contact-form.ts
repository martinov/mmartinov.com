import { formFields } from "../content/contact.ts";

export const GENERIC_ERROR = "Something went wrong. Please try again.";

const INVALID_FIELDS_ERROR =
  "Please fill in your name, a valid email and a message.";

/** The message shown under each field that has one, by field name. */
export type FieldErrors = Readonly<Record<string, string>>;

export interface FormError {
  /** Banner text; empty when the fields carry the whole error. */
  message: string;
  sendFailed: boolean;
  fields: FieldErrors;
}

const FIELD_MESSAGES: FieldErrors = Object.fromEntries(
  formFields.flatMap((field) =>
    field.error ? [[field.name, field.error]] : [],
  ),
);

/** The message for an invalid field, or undefined for one the form doesn't show. */
export const fieldMessage = (name: string): string | undefined =>
  FIELD_MESSAGES[name];

/**
 * What the form shows for a failed `contact` action. `invalidFields` is the
 * `fields` of an input error (`isInputError`), passed in so this module needs
 * nothing from `astro:actions` at runtime.
 */
export const toFormError = (
  error: { readonly code: string; readonly message: string },
  invalidFields?: Readonly<Record<string, readonly string[] | undefined>>,
): FormError => {
  if (invalidFields) {
    const fields = Object.fromEntries(
      Object.keys(invalidFields).flatMap((name) => {
        const message = fieldMessage(name);
        return message ? [[name, message]] : [];
      }),
    );
    const onField = Object.keys(fields).length > 0;
    return {
      message: onField ? "" : INVALID_FIELDS_ERROR,
      sendFailed: false,
      fields,
    };
  }
  if (error.code === "BAD_GATEWAY") {
    return { message: error.message, sendFailed: true, fields: {} };
  }
  if (error.code === "BAD_REQUEST") {
    return { message: error.message, sendFailed: false, fields: {} };
  }
  return { message: GENERIC_ERROR, sendFailed: false, fields: {} };
};
