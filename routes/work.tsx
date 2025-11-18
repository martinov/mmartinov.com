import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import {
  workIntro,
  caseStudies,
  otherExperience,
  workCta,
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
        <Section class="pt-16 sm:pt-20 pb-12 sm:pb-16 gradient-hero">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {workIntro.heading}
            </h1>
            <p class="text-xl text-gray-700 font-medium">{workIntro.intro}</p>
          </div>
        </Section>

        {/* Case Studies */}
        {caseStudies.map((caseStudy, index) => (
          <Section
            key={caseStudy.id}
            id={caseStudy.id}
            class={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <div class="max-w-4xl mx-auto">
              <h2 class="text-4xl font-bold mb-6 gradient-text">{caseStudy.title}</h2>

              {/* Challenge */}
              {caseStudy.challenge && (
                <div class="mb-10">
                  <h3 class="text-2xl font-bold mb-5 text-gray-900">
                    {caseStudy.challenge.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.challenge.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed"
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
                  <h3 class="text-2xl font-bold mb-5 text-gray-900">
                    {caseStudy.solution.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.solution.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed"
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
                  <h3 class="text-2xl font-bold mb-5 text-gray-900">
                    {caseStudy.roadmap.heading}
                  </h3>
                  <div class="space-y-5">
                    {caseStudy.roadmap.items.map((item, i) => (
                      <div key={i} class="accent-border-l pl-5 p-4 rounded-r-lg bg-gradient-to-r from-teal-50/50 to-transparent shadow-sm hover:shadow-md transition-smooth">
                        <h4 class="font-bold text-teal-600 mb-2 text-lg">
                          {item.title}
                        </h4>
                        <p class="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approach (for HVAC case study) */}
              {caseStudy.approach && (
                <div class="mb-10">
                  <h3 class="text-2xl font-bold mb-5 text-gray-900">
                    {caseStudy.approach.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.approach.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed"
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
                  <h3 class="text-2xl font-bold mb-5 text-gray-900">
                    {caseStudy.insight.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.insight.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed"
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
                  <h3 class="text-2xl font-bold mb-5 text-gray-900">
                    {caseStudy.outcome.heading || "The Outcome"}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.outcome.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed"
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
        <Section>
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold mb-6">{otherExperience.heading}</h2>
            <p class="text-gray-700 mb-4">{otherExperience.text}</p>
            <p class="text-gray-600 italic">{otherExperience.note}</p>
          </div>
        </Section>

        {/* CTA */}
        <Section class="gradient-cta text-white">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-4xl sm:text-5xl font-bold mb-8">{workCta.text}</h2>
            <Button href={workCta.ctaLink} variant="secondary">
              {workCta.ctaText}
            </Button>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
