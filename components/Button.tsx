import { ComponentChildren } from "preact";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary";
  children: ComponentChildren;
  class?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "primary",
  children,
  class: className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95";

  const variantStyles = {
    primary: "bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600 focus:ring-teal-600 shadow-md hover:shadow-hover",
    secondary: "bg-white text-teal-600 border-2 border-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-white focus:ring-teal-600 shadow-sm hover:shadow-md",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} class={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} class={combinedClassName}>
      {children}
    </button>
  );
}
