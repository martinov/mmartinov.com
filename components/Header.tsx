import { navigation } from "../content/site.ts";

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = "/" }: HeaderProps) {
  return (
    <header class="border-b border-gray-200">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <a href="/" class="text-lg font-semibold text-gray-900 hover:text-teal-600">
            Martin Martinov
          </a>
          <ul class="flex gap-6 sm:gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  class={`text-sm font-medium transition-colors ${
                    currentPath === item.href
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-teal-600"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
