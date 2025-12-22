import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import {
  caseStudies,
  otherExperience,
  workCta,
  workIntro,
} from "../content/work.ts";

export default define.page(function Work() {
  return (
    <>
      <SEO
        title="Work"
        description="Selected projects: Business process automation and AI integration case studies from finance, e-commerce, HVAC, and international organizations."
        path="/work"
      />
      <PageLayout currentPath="/work">
        {/* Page Heading */}
        <Section class="pt-12 sm:pt-16" width="narrow" spacing="large">
          <div class="text-center">
            <h1
              class="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900"
              style="font-family: var(--font-display);"
            >
              {workIntro.heading}
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {workIntro.intro}
            </p>
          </div>
        </Section>

        {/* Case Studies */}
        {caseStudies.map((caseStudy, index) => (
          <Section
            key={caseStudy.id}
            id={caseStudy.id}
            class={index % 2 === 0
              ? "bg-white"
              : "bg-gradient-to-br from-gray-50 to-gray-100/30"}
            width="narrow"
            spacing="large"
          >
            <div>
              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900"
                style="font-family: var(--font-display);"
              >
                {caseStudy.title}
              </h2>

              {/* Challenge */}
              {caseStudy.challenge && (
                <div class="mb-10">
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-teal-700">
                    {caseStudy.challenge.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.challenge.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solution */}
              {caseStudy.solution && (
                <div class="mb-10">
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-blue-600">
                    {caseStudy.solution.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.solution.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-blue-600 before:font-bold leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Roadmap (for HVAC case study) */}
              {caseStudy.roadmap && (
                <div class="mb-10">
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-teal-700">
                    {caseStudy.roadmap.heading}
                  </h3>
                  <div class="space-y-5">
                    {caseStudy.roadmap.items.map((item, i) => (
                      <div
                        key={i}
                        class="border-l-4 border-teal-600 pl-5 py-2 bg-teal-50/30 rounded-r-lg"
                      >
                        <h4 class="font-semibold text-teal-700 mb-2 text-lg">
                          {item.title}
                        </h4>
                        <p class="text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approach (for HVAC case study) */}
              {caseStudy.approach && (
                <div class="mb-10">
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-blue-600">
                    {caseStudy.approach.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.approach.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-blue-600 before:font-bold leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Insight (for HVAC case study) */}
              {caseStudy.insight && (
                <div class="mb-10">
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-gray-800">
                    {caseStudy.insight.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.insight.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-7 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Outcome */}
              {caseStudy.outcome && (
                <div>
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-green-700">
                    {caseStudy.outcome.heading || "The Outcome"}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.outcome.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-7 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        ))}

        {/* Other Experience */}
        <Section width="narrow" class="border-t border-gray-200">
          <div>
            <h2
              class="text-3xl sm:text-4xl font-bold mb-6 text-gray-900"
              style="font-family: var(--font-display);"
            >
              {otherExperience.heading}
            </h2>
            <p class="text-gray-700 mb-5 text-lg leading-relaxed">
              {otherExperience.text}
            </p>
            <p class="text-gray-600 italic leading-relaxed">
              {otherExperience.note}
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section
          class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white overflow-hidden"
          spacing="large"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-teal-900/10 to-blue-900/10 pointer-events-none">
          </div>

          <div class="relative max-w-3xl mx-auto text-center">
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-white"
              style="font-family: var(--font-display);"
            >
              {workCta.text}
            </h2>
            <Button href={workCta.ctaLink} variant="primary">
              {workCta.ctaText}
            </Button>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
