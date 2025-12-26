import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import {
  aboutCta,
  aboutHero,
  beyondWork,
  howIWork,
  professionalJourney,
  story,
  technicalApproach,
} from "../content/about.ts";

export default define.page(function About() {
  return (
    <>
      <SEO
        title="About"
        description="22+ years of software development. From coding at age 11 to building systems across finance, insurance, healthcare, and e-commerce. Based in Bulgaria, working globally."
        path="/about"
      />
      <PageLayout currentPath="/about">
        {/* Hero */}
        <Section class="pt-16 sm:pt-20" width="narrow" spacing="large">
          <div class="text-center mb-16">
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900"
              style="font-family: var(--font-display);"
            >
              {aboutHero.heading}
            </h1>
          </div>

          {/* The Story */}
          <div class="mb-16">
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-slate-900"
              style="font-family: var(--font-display);"
            >
              {story.heading}
            </h2>
            <div class="space-y-5">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index} class="text-lg text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div class="h-px bg-slate-300 mb-16">
          </div>

          {/* Professional Journey */}
          <div class="mb-16">
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-slate-900"
              style="font-family: var(--font-display);"
            >
              {professionalJourney.heading}
            </h2>
            <ul class="space-y-4">
              {professionalJourney.milestones.map((milestone, index) => (
                <li
                  key={index}
                  class="text-slate-700 text-lg pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
                >
                  {milestone}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div class="h-px bg-slate-300 mb-16">
          </div>

          {/* How I Work */}
          <div class="mb-16">
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-slate-900"
              style="font-family: var(--font-display);"
            >
              {howIWork.heading}
            </h2>
            <ul class="space-y-4">
              {howIWork.points.map((point, index) => (
                <li
                  key={index}
                  class="text-slate-700 text-lg pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
                >
                  {typeof point === "string" ? point : (
                    <>
                      {point.text.split(point.link.text)[0]}
                      <a
                        href={point.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-slate-900 font-semibold hover:text-cyan-700 transition-colors underline decoration-slate-300 hover:decoration-cyan-700 underline-offset-2"
                      >
                        {point.link.text}
                      </a>
                      {point.text.split(point.link.text)[1]}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div class="h-px bg-slate-300 mb-16">
          </div>

          {/* Technical Approach */}
          <div class="mb-16">
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-slate-900"
              style="font-family: var(--font-display);"
            >
              {technicalApproach.heading}
            </h2>
            <ul class="space-y-4">
              {technicalApproach.points.map((point, index) => (
                <li
                  key={index}
                  class="text-slate-700 text-lg pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div class="h-px bg-slate-300 mb-16">
          </div>

          {/* Beyond Work */}
          <div class="mb-8">
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-slate-900"
              style="font-family: var(--font-display);"
            >
              {beyondWork.heading}
            </h2>
            <ul class="space-y-4">
              {beyondWork.interests.map((interest, index) => (
                <li
                  key={index}
                  class="text-slate-700 text-lg pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* CTA */}
        <Section class="border-t-2 border-slate-900" spacing="large">
          <div class="relative max-w-3xl mx-auto text-center">
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-slate-900"
              style="font-family: var(--font-display);"
            >
              {aboutCta.text}
            </h2>
            <Button href={aboutCta.ctaLink} variant="primary">
              {aboutCta.ctaText}
            </Button>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
