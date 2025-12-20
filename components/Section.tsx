import { ComponentChildren } from "preact";

interface SectionProps {
  children: ComponentChildren;
  class?: string;
  container?: boolean;
}

export default function Section(
  { children, class: className = "", container = true }: SectionProps,
) {
  return (
    <section class={`py-16 sm:py-20 ${className}`}>
      {container
        ? (
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        )
        : children}
    </section>
  );
}
