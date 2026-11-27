import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { actions, isInputError } from "astro:actions";
import { buttonClass } from "../lib/button.ts";
import {
  fieldMessage,
  GENERIC_ERROR,
  toFormError,
  type FieldErrors,
} from "../lib/contact-form.ts";
import { formFields } from "../content/contact.ts";
import { siteConfig } from "../content/site.ts";

const INPUT_CLASS =
  "w-full px-4 py-3.5 border-2 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:border-cyan-700 transition-colors text-base";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

interface ContactFormProps {
  antispamToken?: string;
}

export default function ContactForm({ antispamToken }: ContactFormProps) {
  const isSubmitting = useSignal(false);
  const submitStatus = useSignal<"idle" | "success" | "error">("idle");
  const errorMessage = useSignal("");
  const sendFailed = useSignal(false);
  const fieldErrors = useSignal<FieldErrors>({});
  const confirmEmailRef = useRef<HTMLInputElement>(null);

  // Fill the confirm_email field with the antispam token via JavaScript
  // Bots that don't execute JS won't have this field filled correctly
  useEffect(() => {
    if (confirmEmailRef.current && antispamToken) {
      confirmEmailRef.current.value = antispamToken;
    }
  }, [antispamToken]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isSubmitting.value = true;
    submitStatus.value = "idle";
    errorMessage.value = "";
    sendFailed.value = false;
    fieldErrors.value = {};

    const form = e.target as HTMLFormElement;

    // Send all data to server for validation (including honeypot fields)
    try {
      const { error } = await actions.contact(new FormData(form));

      if (error) {
        const formError = toFormError(
          error,
          isInputError(error) ? error.fields : undefined,
        );
        submitStatus.value = "error";
        errorMessage.value = formError.message;
        sendFailed.value = formError.sendFailed;
        fieldErrors.value = formError.fields;
        // Focus makes a screen reader announce the field with its error
        const firstInvalid = formFields.find(
          (field) => formError.fields[field.name],
        );
        if (firstInvalid) {
          form.querySelector<FieldElement>(`#${firstInvalid.name}`)?.focus();
        }
      } else {
        submitStatus.value = "success";
        form.reset();
      }
    } catch {
      submitStatus.value = "error";
      errorMessage.value = GENERIC_ERROR;
    } finally {
      isSubmitting.value = false;
    }
  };

  // The browser's own validity (required, type="email") shows the error
  // before submit; the server's answer replaces it afterwards
  const validateOnBlur = (e: FocusEvent) => {
    const field = e.currentTarget as FieldElement;
    const message = fieldMessage(field.name);
    if (!message || field.validity.valid) return;
    fieldErrors.value = { ...fieldErrors.value, [field.name]: message };
  };

  const clearFieldError = (e: Event) => {
    const { name } = e.currentTarget as FieldElement;
    if (!fieldErrors.value[name]) return;
    const { [name]: _, ...rest } = fieldErrors.value;
    fieldErrors.value = rest;
  };

  const fieldProps = (name: string) => {
    const invalid = Boolean(fieldErrors.value[name]);
    return {
      id: name,
      name,
      "aria-invalid": invalid ? ("true" as const) : undefined,
      "aria-describedby": invalid ? `${name}-error` : undefined,
      onBlur: validateOnBlur,
      onInput: clearFieldError,
      class: `${INPUT_CLASS} ${invalid ? "border-red-700" : "border-slate-300"}`,
    };
  };

  return (
    <div class="bg-white border-2 border-slate-900 p-6 sm:p-8 lg:p-10">
      {submitStatus.value === "success" ? (
        <div class="text-center py-10">
          <div class="w-20 h-20 mx-auto mb-6 bg-slate-900 flex items-center justify-center">
            <svg
              class="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl sm:text-3xl mb-3">Message Sent!</h3>
          <p class="text-slate-600 text-lg mb-8 leading-relaxed">
            Thanks for reaching out. I'll get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => (submitStatus.value = "idle")}
            class="text-slate-900 hover:text-cyan-700 transition-colors font-semibold underline decoration-slate-300 hover:decoration-cyan-700 underline-offset-2"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          // Keeps fields out of the URL if submitted before hydration
          method="post"
          onSubmit={handleSubmit}
          class="space-y-6"
        >
          {/* Honeypot fields - hidden from humans, visible to bots */}
          {/* Field 1: Simple honeypot - should remain empty */}
          <div
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          >
            <label htmlFor="website">Website (leave blank)</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {/* Field 2: JS-required field - filled via JavaScript with antispam token */}
          {/* Bots that don't execute JS will leave this empty or fill it incorrectly */}
          <div
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          >
            <label htmlFor="confirm_email">Confirm email (required)</label>
            <input
              type="text"
              id="confirm_email"
              name="confirm_email"
              ref={confirmEmailRef}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {formFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                class="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
              >
                {field.label}{" "}
                {field.required && <span class="text-red-500">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  {...fieldProps(field.name)}
                  required={field.required}
                  placeholder={field.placeholder}
                  rows={field.rows || 5}
                />
              ) : (
                <input
                  {...fieldProps(field.name)}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              )}
              {fieldErrors.value[field.name] && (
                <p id={`${field.name}-error`} class="mt-2 text-sm text-red-700">
                  {fieldErrors.value[field.name]}
                </p>
              )}
            </div>
          ))}

          {(sendFailed.value || errorMessage.value) && (
            <div
              role="alert"
              class="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              {sendFailed.value ? (
                <span>
                  Your message couldn't be sent. Please email me directly at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    class="font-semibold underline underline-offset-2"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </span>
              ) : (
                <span>{errorMessage.value}</span>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting.value}
            class={buttonClass({ variant: "primary", class: "w-full" })}
          >
            {isSubmitting.value ? (
              <>
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending…
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
