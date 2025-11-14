import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import ServiceIcon from "../components/ServiceIcon.tsx";
import {
  hero,
  credibilityBand,
  whatIDo,
  recentWork,
  aboutPreview,
  finalCta,
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
        <Section class="pt-12 sm:pt-16">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {hero.headline}
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
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
        <Section class="bg-gray-50">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {credibilityBand.map((item, index) => (
              <div key={index} class="text-sm sm:text-base text-gray-700">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-teal-600 font-medium"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* What I Do Section */}
        <Section>
          <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12">
            {whatIDo.heading}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {whatIDo.services.map((service, index) => (
              <div key={index}>
                <div class="flex items-start gap-3 mb-4 h-12">
                  <ServiceIcon type={service.icon as "workflow" | "brain" | "architecture"} />
                  <h3 class="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p class="text-gray-600 mb-2">
                  <span class="font-medium">Problem:</span> {service.problem}
                </p>
                <p class="text-gray-600">
                  <span class="font-medium">Solution:</span> {service.solution}
                </p>
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
