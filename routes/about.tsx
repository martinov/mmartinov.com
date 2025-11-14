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
        <Section class="pt-12 sm:pt-16">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl font-bold mb-12">
              {aboutHero.heading}
            </h1>

            {/* The Story */}
            <div class="mb-12">
              <h2 class="text-2xl font-semibold mb-6">{story.heading}</h2>
              <div class="space-y-4">
                {story.paragraphs.map((paragraph, index) => (
                  <p key={index} class="text-lg text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Professional Journey */}
            <div class="mb-12">
              <h2 class="text-2xl font-semibold mb-6">
                {professionalJourney.heading}
              </h2>
              <ul class="space-y-3">
                {professionalJourney.milestones.map((milestone, index) => (
                  <li
                    key={index}
                    class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0"
                  >
                    {milestone}
                  </li>
                ))}
              </ul>
            </div>

            {/* How I Work */}
            <div class="mb-12">
              <h2 class="text-2xl font-semibold mb-6">{howIWork.heading}</h2>
              <ul class="space-y-3">
                {howIWork.points.map((point, index) => (
                  <li
                    key={index}
                    class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0"
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
                          class="text-teal-600 font-medium hover:text-teal-700 hover:underline"
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
            <div class="mb-12">
              <h2 class="text-2xl font-semibold mb-6">{beyondWork.heading}</h2>
              <ul class="space-y-3">
                {beyondWork.interests.map((interest, index) => (
                  <li
                    key={index}
                    class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Approach */}
            <div class="mb-12">
              <h2 class="text-2xl font-semibold mb-6">
                {technicalApproach.heading}
              </h2>
              <ul class="space-y-3">
                {technicalApproach.points.map((point, index) => (
                  <li
                    key={index}
                    class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section class="bg-gray-900 text-white">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-6">{aboutCta.text}</h2>
            <Button href={aboutCta.ctaLink} variant="secondary">
              {aboutCta.ctaText}
            </Button>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
