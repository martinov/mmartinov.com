import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import Button from "../components/Button.tsx";
import { formFields } from "../content/contact.ts";

interface ContactFormProps {
  antispamToken?: string;
}

export default function ContactForm({ antispamToken }: ContactFormProps) {
  const isSubmitting = useSignal(false);
  const submitStatus = useSignal<"idle" | "success" | "error">("idle");
  const errorMessage = useSignal("");
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

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Send all data to server for validation (including honeypot fields)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        submitStatus.value = "success";
        form.reset();
      } else {
        const result = await response.json();
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      submitStatus.value = "error";
      errorMessage.value = error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";
    } finally {
      isSubmitting.value = false;
    }
  };

  return (
    <div class="bg-white border-2 border-slate-900 p-6 sm:p-8 lg:p-10">
      {submitStatus.value === "success"
        ? (
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
                >
                </path>
              </svg>
            </div>
            <h3
              class="text-2xl sm:text-3xl font-bold mb-3 text-slate-900"
              style="font-family: var(--font-display);"
            >
              Message Sent!
            </h3>
            <p class="text-slate-600 text-lg mb-8 leading-relaxed">
              Thanks for reaching out. I'll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => submitStatus.value = "idle"}
              class="text-slate-900 hover:text-cyan-700 transition-colors font-semibold underline decoration-slate-300 hover:decoration-cyan-700 underline-offset-2"
            >
              Send another message
            </button>
          </div>
        )
        : (
          <form onSubmit={handleSubmit} class="space-y-6">
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
                {field.type === "textarea"
                  ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={field.rows || 5}
                      class="w-full px-4 py-3.5 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:border-cyan-700 transition-colors text-base invalid:border-red-500 invalid:focus:ring-red-500 invalid:focus:border-red-500"
                    />
                  )
                  : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      class="w-full px-4 py-3.5 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:border-cyan-700 transition-colors text-base invalid:border-red-500 invalid:focus:ring-red-500 invalid:focus:border-red-500"
                    />
                  )}
              </div>
            ))}

            {submitStatus.value === "error" && (
              <div class="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 flex items-start gap-3">
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
                <span>{errorMessage.value}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              class="w-full"
              loading={isSubmitting.value}
            >
              Send Message
            </Button>
          </form>
        )}
    </div>
  );
}
