import { navigation } from "../content/site.ts";

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = "/" }: HeaderProps) {
  return (
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <a href="/" class="text-lg font-bold text-gray-900 hover:text-teal-700 transition-colors">
            Martin Martinov
          </a>
          <ul class="flex gap-6 sm:gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  class={`text-sm font-medium transition-all duration-200 ${
                    currentPath === item.href
                      ? "text-teal-700"
                      : "text-gray-600 hover:text-teal-700 hover:bg-gray-50 px-3 py-2 rounded-md"
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
