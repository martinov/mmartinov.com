import { siteConfig } from "../content/site.ts";

export default function Footer() {
  return (
    <footer class="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 mt-20 border-t border-gray-800/50">
      {/* Decorative top gradient line */}
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
          <div class="md:col-span-3">
            <h3
              class="text-base sm:text-lg font-semibold text-white mb-3"
              style="font-family: var(--font-display)"
            >
              Martin Martinov
            </h3>
            <p class="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
              Software architect specializing in business process automation and
              AI integration
            </p>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <ul class="space-y-3">
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-teal-400 transition-colors duration-300"></span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span class="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-teal-400 transition-colors duration-300"></span>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-10 pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p class="text-sm text-gray-500 leading-relaxed">
            Solutions Architect and co-owner at{" "}
            <a
              href="https://camplight.net?utm_source=mmartinov.com&utm_medium=footer&utm_campaign=personal-site-referral"
              target="_blank"
              rel="noopener"
              class="text-teal-500 hover:text-teal-400 transition-colors duration-300 font-medium underline decoration-teal-500/30 hover:decoration-teal-400 underline-offset-2"
            >
              Camplight
            </a>
          </p>
          <p class="text-sm text-gray-500">{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
