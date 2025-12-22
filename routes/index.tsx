import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import ServiceIcon from "../components/ServiceIcon.tsx";
import { credibilityBand, hero, whatIDo } from "../content/home.ts";

export default define.page(function Home() {
  return (
    <>
      <SEO
        title="Martin Martinov - Software Architect & Automation Consultant"
        description="Software architect specializing in business process automation and AI integration. 22+ years building systems that work."
        path="/"
      />
      <PageLayout currentPath="/">
        {/* Hero Section */}
        <Section
          class="relative pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20 overflow-hidden"
          width="wide"
          spacing="large"
        >
          {/* Enhanced Background Blobs */}
          <div class="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div
              class="absolute top-[-15%] right-[-8%] w-[35rem] h-[35rem] bg-gradient-to-br from-teal-200/40 to-teal-100/30 rounded-full blur-3xl animate-pulse"
              style="animation-duration: 4s;"
            >
            </div>
            <div
              class="absolute top-[5%] left-[-12%] w-[32rem] h-[32rem] bg-gradient-to-br from-blue-200/35 to-blue-100/25 rounded-full blur-3xl animate-pulse"
              style="animation-duration: 5s; animation-delay: 1s;"
            >
            </div>
            <div
              class="absolute bottom-[-10%] right-[15%] w-[28rem] h-[28rem] bg-gradient-to-br from-teal-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse"
              style="animation-duration: 6s; animation-delay: 2s;"
            >
            </div>
          </div>

          <div class="text-center max-w-4xl mx-auto px-4 animate-fade-in-up">
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-gray-900 leading-tight"
              style="font-family: var(--font-display); letter-spacing: -0.03em;"
            >
              Software architect<br />
              specializing in<br />
              business process automation and<br />
              AI integration
            </h1>
            <p class="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
              {hero.subheadline}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
              <Button
                href={hero.primaryCta.href}
                variant="primary"
                fullWidthMobile
              >
                {hero.primaryCta.text}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                fullWidthMobile
              >
                {hero.secondaryCta.text}
              </Button>
            </div>
          </div>
        </Section>

        {/* Credibility Band */}
        <Section
          class="bg-gradient-to-br from-teal-50/60 to-blue-50/40 border-y border-teal-100/60"
          spacing="small"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {credibilityBand.map((item, index) => (
              <div key={index} class="flex items-center justify-center h-full">
                <div class="text-sm sm:text-base text-gray-700 font-medium">
                  {item.link
                    ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener"
                        class="text-teal-700 hover:text-teal-900 transition-all duration-300 hover:underline decoration-teal-400 underline-offset-2 decoration-2"
                      >
                        {item.text}
                      </a>
                    )
                    : <span>{item.text}</span>}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* What I Do Section */}
        <Section spacing="large">
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-gray-900"
            style="font-family: var(--font-display);"
          >
            {whatIDo.heading}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whatIDo.services.map((service, index) => (
              <div
                key={index}
                class="group bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:border-teal-200/50 transition-all duration-500 hover:-translate-y-1"
              >
                <div class="mb-6">
                  <ServiceIcon
                    type={service.icon as "workflow" | "brain" | "architecture"}
                  />
                </div>
                <h3
                  class="text-xl lg:text-2xl font-bold text-gray-900 mb-5"
                  style="font-family: var(--font-display);"
                >
                  {service.title}
                </h3>
                <div class="space-y-4">
                  <p class="text-gray-600 leading-relaxed">
                    <span class="font-semibold text-teal-700 block mb-2 text-sm uppercase tracking-wider">
                      Problem
                    </span>
                    {service.problem}
                  </p>
                  <p class="text-gray-600 leading-relaxed">
                    <span class="font-semibold text-blue-600 block mb-2 text-sm uppercase tracking-wider">
                      Solution
                    </span>
                    {service.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
