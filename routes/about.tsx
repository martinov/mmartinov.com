import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import {
  aboutHero,
  story,
  professionalJourney,
  howIWork,
  beyondWork,
  technicalApproach,
  aboutCta,
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
        <Section class="pt-16 sm:pt-20 pb-12 sm:pb-16 gradient-hero">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-5xl sm:text-6xl font-bold mb-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {aboutHero.heading}
            </h1>

            {/* The Story */}
            <div class="mb-16">
              <h2 class="text-3xl font-bold mb-8 gradient-text">{story.heading}</h2>
              <div class="space-y-5">
                {story.paragraphs.map((paragraph, index) => (
                  <p key={index} class="text-lg text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Professional Journey */}
            <div class="mb-16">
              <h2 class="text-3xl font-bold mb-8 gradient-text">
                {professionalJourney.heading}
              </h2>
              <ul class="space-y-4">
                {professionalJourney.milestones.map((milestone, index) => (
                  <li
                    key={index}
                    class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed text-lg"
                  >
                    {milestone}
                  </li>
                ))}
              </ul>
            </div>

            {/* How I Work */}
            <div class="mb-16">
              <h2 class="text-3xl font-bold mb-8 gradient-text">{howIWork.heading}</h2>
              <ul class="space-y-4">
                {howIWork.points.map((point, index) => (
                  <li
                    key={index}
                    class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed text-lg"
                  >
                    {typeof point === "string" ? (
                      point
                    ) : (
                      <>
                        {point.text.split(point.link.text)[0]}
                        <a
                          href={point.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-teal-600 font-semibold hover:text-teal-700 link-underline transition-smooth"
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

            {/* Beyond Work */}
            <div class="mb-16">
              <h2 class="text-3xl font-bold mb-8 gradient-text">{beyondWork.heading}</h2>
              <ul class="space-y-4">
                {beyondWork.interests.map((interest, index) => (
                  <li
                    key={index}
                    class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed text-lg"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Approach */}
            <div class="mb-16">
              <h2 class="text-3xl font-bold mb-8 gradient-text">
                {technicalApproach.heading}
              </h2>
              <ul class="space-y-4">
                {technicalApproach.points.map((point, index) => (
                  <li
                    key={index}
                    class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed text-lg"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section class="gradient-cta text-white">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-4xl sm:text-5xl font-bold mb-8">{aboutCta.text}</h2>
            <Button href={aboutCta.ctaLink} variant="secondary">
              {aboutCta.ctaText}
            </Button>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
