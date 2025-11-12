import { siteConfig } from "../content/site.ts";

export default function Footer() {
  return (
    <footer class="border-t border-gray-200 mt-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-3">
            <h3 class="text-sm font-semibold text-gray-900 mb-4">
              Martin Martinov
            </h3>
            <p class="text-sm text-gray-600">
              Software architect specializing in business process automation and AI integration
            </p>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Connect</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-gray-600 hover:text-teal-600"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-gray-600 hover:text-teal-600"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-600">
            Also co-owner of{" "}
            <a
              href="https://camplight.net"
              target="_blank"
              rel="noopener noreferrer"
              class="text-teal-600 hover:text-teal-700 hover:underline font-medium"
            >
              Camplight
            </a>
          </p>
          <p class="text-sm text-gray-600">{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
