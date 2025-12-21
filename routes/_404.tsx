import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";

export default define.page(function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path=""
      />
      <PageLayout currentPath="">
        <Section
          class="relative pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20 overflow-hidden min-h-[60vh] flex items-center"
          width="narrow"
          spacing="large"
        >
          {/* Background Blobs */}
          <div class="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div class="absolute top-[-15%] right-[-8%] w-[35rem] h-[35rem] bg-gradient-to-br from-teal-200/40 to-teal-100/30 rounded-full blur-3xl animate-pulse" style="animation-duration: 4s;"></div>
            <div class="absolute bottom-[-10%] left-[-12%] w-[32rem] h-[32rem] bg-gradient-to-br from-blue-200/35 to-blue-100/25 rounded-full blur-3xl animate-pulse" style="animation-duration: 5s; animation-delay: 1s;"></div>
          </div>

          <div class="text-center max-w-2xl mx-auto px-4 animate-fade-in-up">
            <div class="mb-8">
              <span
                class="text-8xl sm:text-9xl font-bold text-teal-600/20"
                style="font-family: var(--font-display);"
              >
                404
              </span>
            </div>
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900"
              style="font-family: var(--font-display); letter-spacing: -0.02em;"
            >
              Page Not Found
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/" variant="primary" fullWidthMobile>
                Back to Home
              </Button>
              <Button href="/contact" variant="secondary" fullWidthMobile>
                Get in Touch
              </Button>
            </div>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
