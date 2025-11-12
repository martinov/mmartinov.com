import { useSignal } from "@preact/signals";
import Button from "../components/Button.tsx";
import { formFields } from "../content/contact.ts";

export default function ContactForm() {
  const isSubmitting = useSignal(false);
  const submitStatus = useSignal<"idle" | "success" | "error">("idle");
  const errorMessage = useSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isSubmitting.value = true;
    submitStatus.value = "idle";
    errorMessage.value = "";

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

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
      {submitStatus.value === "success" ? (
        <div class="text-center py-8">
          <div class="text-green-600 text-5xl mb-4">✓</div>
          <h3 class="text-2xl font-semibold mb-2">Message Sent!</h3>
          <p class="text-gray-600 mb-6">
            Thanks for reaching out. I'll get back to you soon.
          </p>
          <button
            onClick={() => submitStatus.value = "idle"}
            class="text-gray-900 hover:underline font-medium"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} class="space-y-6">
          {formFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {field.label} {field.required && <span class="text-red-500">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  rows={field.rows || 4}
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
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
