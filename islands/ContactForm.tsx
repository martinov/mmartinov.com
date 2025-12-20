import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Button from "../components/Button.tsx";
import { formFields } from "../content/contact.ts";

export default function ContactForm() {
  const isSubmitting = useSignal(false);
  const submitStatus = useSignal<"idle" | "success" | "error">("idle");
  const errorMessage = useSignal("");
  const formLoadTime = useSignal(0);

  // Track when the form was loaded for anti-spam timing check
  useEffect(() => {
    formLoadTime.value = Date.now();
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isSubmitting.value = true;
    submitStatus.value = "idle";
    errorMessage.value = "";

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Anti-spam checks
    // 1. Check honeypot field (should be empty)
    if (data.website) {
      // Bot detected - fail silently
      submitStatus.value = "error";
      errorMessage.value = "Something went wrong. Please try again.";
      isSubmitting.value = false;
      return;
    }

    // 2. Check minimum time (humans take at least 3 seconds to fill a form)
    const timeSpent = Date.now() - formLoadTime.value;
    if (timeSpent < 3000) {
      submitStatus.value = "error";
      errorMessage.value = "Please take your time filling out the form.";
      isSubmitting.value = false;
      return;
    }

    // Remove honeypot from data before sending
    delete data.website;

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
    <div class="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
      {submitStatus.value === "success"
        ? (
          <div class="text-center py-8">
            <div class="text-emerald-500 text-5xl mb-4">✓</div>
            <h3 class="text-2xl font-semibold mb-2">Message Sent!</h3>
            <p class="text-gray-600 mb-6">
              Thanks for reaching out. I'll get back to you soon.
            </p>
            <button
              onClick={() => submitStatus.value = "idle"}
              class="text-teal-600 hover:text-teal-700 hover:underline font-medium"
            >
              Send another message
            </button>
          </div>
        )
        : (
          <form onSubmit={handleSubmit} class="space-y-6">
            {/* Honeypot field - hidden from humans, visible to bots */}
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

            {formFields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  class="block text-sm font-medium text-gray-700 mb-2"
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
                      rows={field.rows || 4}
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    />
                  )
                  : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    />
                  )}
              </div>
            ))}

            {submitStatus.value === "error" && (
              <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {errorMessage.value}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              class="w-full"
            >
              {isSubmitting.value ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
    </div>
  );
}
