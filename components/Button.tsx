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
    "inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-slate-900 text-white border-2 border-slate-900 hover:bg-white hover:text-slate-900",
    secondary:
      "bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white",
  };

  const mobileWidthClass = fullWidthMobile ? "w-full sm:w-auto" : "";

  const combinedClassName = `${baseStyles} ${
    variantStyles[variant]
  } ${mobileWidthClass} ${className}`;

  const content = loading
    ? (
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
    )
    : children;

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
