import { ComponentChildren } from "preact";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary";
  children: ComponentChildren;
  class?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  loading?: boolean;
  fullWidthMobile?: boolean;
}

export default function Button({
  href,
  variant = "primary",
  children,
  class: className = "",
  type = "button",
  onClick,
  loading = false,
  fullWidthMobile = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 text-base font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 shadow-sm hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  const variantStyles = {
    primary:
      "bg-gradient-to-br from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 border border-teal-800/20",
    secondary:
      "bg-white text-teal-700 border-2 border-teal-700 hover:bg-gradient-to-br hover:from-teal-50 hover:to-blue-50",
  };

  const mobileWidthClass = fullWidthMobile ? "w-full sm:w-auto" : "";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${mobileWidthClass} ${className}`;

  const content = loading ? (
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
      Loading...
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <a href={href} class={combinedClassName}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      class={combinedClassName}
    >
      {content}
    </button>
  );
}
