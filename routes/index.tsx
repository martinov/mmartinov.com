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
        <Section class="pt-16 sm:pt-20 pb-20 sm:pb-24 gradient-hero">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {hero.headline}
            </h1>
            <p class="text-xl sm:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium">
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
          <h2 class="text-4xl sm:text-5xl font-bold text-center mb-16">
            {whatIDo.heading}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {whatIDo.services.map((service, index) => (
              <div key={index} class="accent-border-l pl-4 p-6 rounded-r-lg bg-gradient-to-br from-white to-gray-50 shadow-card hover:shadow-hover">
                <h3 class="text-xl font-bold mb-4 gradient-text">{service.title}</h3>
                <p class="text-gray-700 mb-3 leading-relaxed">
                  <span class="font-semibold text-gray-900">Problem:</span> {service.problem}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Recent Work Section */}
        <Section class="bg-gradient-to-b from-gray-50 to-white">
          <h2 class="text-4xl sm:text-5xl font-bold text-center mb-16">
            {recentWork.heading}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {recentWork.projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                class="block bg-white p-8 rounded-xl shadow-card hover:shadow-hover border border-gray-100 group"
              >
                <h3 class="text-2xl font-bold mb-4 group-hover:text-teal-600 transition-smooth">{project.type}</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                <p class="text-sm font-semibold text-teal-600 flex items-center gap-2">
                  {project.outcome}
                  <span class="transform group-hover:translate-x-1 transition-transform">→</span>
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
        <Section class="gradient-cta text-white">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-4xl sm:text-5xl font-bold mb-6">
              {finalCta.heading}
            </h2>
            <p class="text-xl text-gray-300 mb-10 leading-relaxed">
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
