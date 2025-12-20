import { ComponentChildren } from "preact";

interface SectionProps {
  children: ComponentChildren;
  class?: string;
  container?: boolean;
  width?: "default" | "narrow" | "wide" | "extraNarrow";
  spacing?: "default" | "large" | "small";
}

export default function Section({
  children,
  class: className = "",
  container = true,
  width = "default",
  spacing = "default",
}: SectionProps) {
  // Width variants
  const widthClasses = {
    default: "max-w-6xl",
    narrow: "max-w-4xl",
    wide: "max-w-7xl",
    extraNarrow: "max-w-3xl",
  };

  // Spacing variants
  const spacingClasses = {
    default: "py-16 sm:py-20 lg:py-24",
    large: "py-20 sm:py-24 lg:py-32",
    small: "py-12 sm:py-16 lg:py-20",
  };

  return (
    <section class={`${spacingClasses[spacing]} ${className}`}>
      {container
        ? (
          <div class={`${widthClasses[width]} mx-auto px-4 sm:px-6 lg:px-8`}>
            {children}
          </div>
        )
        : children}
    </section>
  );
}
