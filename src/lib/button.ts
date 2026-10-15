export type ButtonVariant = "primary" | "secondary";

interface ButtonClassOptions {
  variant?: ButtonVariant;
  fullWidthMobile?: boolean;
  class?: string;
}

const baseStyles =
  "inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-white border-2 border-slate-900 hover:bg-white hover:text-slate-900",
  secondary:
    "bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white",
};

// Shared by Button.astro (links) and the ContactForm island (submit button)
export const buttonClass = ({
  variant = "primary",
  fullWidthMobile = false,
  class: className = "",
}: ButtonClassOptions = {}): string =>
  `${baseStyles} ${variantStyles[variant]} ${
    fullWidthMobile ? "w-full sm:w-auto" : ""
  } ${className}`;
