import { navigation } from "../content/site.ts";

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = "/" }: HeaderProps) {
  return (
    <header class="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 sm:h-18">
          <a
            href="/"
            class="text-lg sm:text-xl font-bold text-gray-900 hover:text-teal-700 transition-colors duration-300"
            style="font-family: var(--font-display)"
          >
            Martin Martinov
          </a>
          <ul class="flex gap-2 sm:gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  class={`text-sm sm:text-base font-medium transition-all duration-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                    currentPath === item.href
                      ? "text-teal-700 bg-gradient-to-br from-teal-50 to-blue-50"
                      : "text-gray-600 hover:text-teal-700 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100"
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
