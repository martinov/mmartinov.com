import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import ServiceIcon from "../components/ServiceIcon.tsx";
import {
  aboutPreview,
  credibilityBand,
  finalCta,
  hero,
  recentWork,
  whatIDo,
} from "../content/home.ts";

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
        <Section class="relative pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden">
          {/* Background Blob */}
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
            <div class="absolute top-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-teal-100/50 rounded-full blur-3xl">
            </div>
            <div class="absolute top-[10%] left-[-10%] w-[25rem] h-[25rem] bg-blue-100/50 rounded-full blur-3xl">
            </div>
          </div>

          <div class="text-center max-w-4xl mx-auto px-4">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
              {hero.headline}
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {hero.subheadline}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={hero.primaryCta.href} variant="primary">
                {hero.primaryCta.text}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.text}
              </Button>
            </div>
          </div>
        </Section>

        {/* Credibility Band */}
        <Section class="bg-teal-50/50 border-y border-teal-100/50">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {credibilityBand.map((item, index) => (
              <div key={index} class="flex items-center justify-center h-full">
                <div class="text-sm sm:text-base text-gray-700 font-medium">
                  {item.link
                    ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-teal-700 hover:text-teal-800 hover:underline decoration-teal-300 underline-offset-2"
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
        <Section>
          <h2 class="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900">
            {whatIDo.heading}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {whatIDo.services.map((service, index) => (
              <div
                key={index}
                class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div class="mb-6">
                  <ServiceIcon
                    type={service.icon as "workflow" | "brain" | "architecture"}
                  />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <div class="space-y-3">
                  <p class="text-gray-600">
                    <span class="font-semibold text-teal-700 block mb-1">
                      Problem:
                    </span>
                    {service.problem}
                  </p>
                  <p class="text-gray-600">
                    <span class="font-semibold text-teal-700 block mb-1">
                      Solution:
                    </span>
                    {service.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Recent Work Section */}
        <Section class="bg-gray-50">
          <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12">
            {recentWork.heading}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {recentWork.projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                class="block bg-white p-6 rounded-lg border border-gray-200 hover:border-teal-600 hover:shadow-md transition-all"
              >
                <h3 class="text-xl font-semibold mb-3">{project.type}</h3>
                <p class="text-gray-600 mb-4">{project.description}</p>
                <p class="text-sm font-medium text-teal-600">
                  {project.outcome}
                </p>
              </a>
            ))}
          </div>
          <div class="text-center">
            <Button href={recentWork.ctaLink} variant="secondary">
              {recentWork.ctaText}
            </Button>
          </div>
        </Section>

        {/* About Preview */}
        <Section>
          <div class="max-w-3xl mx-auto text-center">
            <p class="text-lg text-gray-700 mb-6">
              {aboutPreview.text}
            </p>
            <Button href={aboutPreview.ctaLink} variant="secondary">
              {aboutPreview.ctaText}
            </Button>
          </div>
        </Section>

        {/* Final CTA Section */}
        <Section class="bg-gray-900 text-white">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl sm:text-4xl font-bold mb-4">
              {finalCta.heading}
            </h2>
            <p class="text-lg text-gray-300 mb-8">
              {finalCta.text}
            </p>
            <Button href={finalCta.ctaLink} variant="secondary">
              {finalCta.ctaText}
            </Button>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
