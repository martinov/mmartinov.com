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
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-95";

  const variantStyles = {
    primary: "bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-700 border border-transparent",
    secondary: "bg-white text-teal-700 border-2 border-teal-700 hover:bg-teal-50 focus:ring-teal-700",
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
