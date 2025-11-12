import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import { workIntro, caseStudies, otherExperience, workCta } from "../content/work.ts";

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
        <Section class="pt-12 sm:pt-16">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl sm:text-5xl font-bold mb-6">
              {workIntro.heading}
            </h1>
            <p class="text-lg text-gray-600">
              {workIntro.intro}
            </p>
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
              <h2 class="text-3xl font-bold mb-3">{caseStudy.title}</h2>
              <p class="text-sm text-gray-500 mb-8 italic">{caseStudy.status}</p>

              {/* Challenge */}
              {caseStudy.challenge && (
                <div class="mb-8">
                  <h3 class="text-xl font-semibold mb-4">
                    {caseStudy.challenge.heading}
                  </h3>
                  <ul class="space-y-2">
                    {caseStudy.challenge.points.map((point, i) => (
                      <li key={i} class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solution */}
              {caseStudy.solution && (
                <div class="mb-8">
                  <h3 class="text-xl font-semibold mb-4">
                    {caseStudy.solution.heading}
                  </h3>
                  <ul class="space-y-2">
                    {caseStudy.solution.points.map((point, i) => (
                      <li key={i} class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Roadmap (for HVAC case study) */}
              {caseStudy.roadmap && (
                <div class="mb-8">
                  <h3 class="text-xl font-semibold mb-4">
                    {caseStudy.roadmap.heading}
                  </h3>
                  <div class="space-y-4">
                    {caseStudy.roadmap.items.map((item, i) => (
                      <div key={i} class="border-l-4 border-teal-600 pl-4">
                        <h4 class="font-semibold text-teal-600 mb-1">
                          {item.title}
                        </h4>
                        <p class="text-gray-700">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approach (for HVAC case study) */}
              {caseStudy.approach && (
                <div class="mb-8">
                  <h3 class="text-xl font-semibold mb-4">
                    {caseStudy.approach.heading}
                  </h3>
                  <ul class="space-y-2">
                    {caseStudy.approach.points.map((point, i) => (
                      <li key={i} class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Insight (for HVAC case study) */}
              {caseStudy.insight && (
                <div class="mb-8">
                  <h3 class="text-xl font-semibold mb-4">
                    {caseStudy.insight.heading}
                  </h3>
                  <ul class="space-y-2">
                    {caseStudy.insight.points.map((point, i) => (
                      <li key={i} class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Outcome */}
              {caseStudy.outcome && (
                <div>
                  <h3 class="text-xl font-semibold mb-4">
                    {caseStudy.outcome.heading || "The Outcome"}
                  </h3>
                  <ul class="space-y-2">
                    {caseStudy.outcome.points.map((point, i) => (
                      <li key={i} class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0">
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
        <Section class="bg-gray-900 text-white">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-6">{workCta.text}</h2>
            <Button href={workCta.ctaLink} variant="secondary">
              {workCta.ctaText}
            </Button>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
