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
        <Section class="pt-16 sm:pt-20 pb-12 sm:pb-16" width="narrow" spacing="none">
          <div class="text-center">
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-900"
              style="font-family: var(--font-display);"
            >
              {workIntro.heading}
            </h1>
            <p class="text-lg sm:text-xl text-slate-700 leading-relaxed">
              {workIntro.intro}
            </p>
          </div>
        </Section>

        {/* Case Studies */}
        {caseStudies.map((caseStudy, index) => (
          <Section
            key={caseStudy.id}
            id={caseStudy.id}
            class={index % 2 === 0 ? "" : "bg-slate-50"}
            width="narrow"
            spacing="large"
          >
            <div>
              <h2
                class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-slate-900"
                style="font-family: var(--font-display);"
              >
                {caseStudy.title}
              </h2>

              {/* Challenge */}
              {caseStudy.challenge && (
                <div class="mb-10">
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-slate-900 uppercase text-sm tracking-wider">
                    {caseStudy.challenge.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.challenge.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-slate-700 pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
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
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-slate-900 uppercase text-sm tracking-wider">
                    {caseStudy.solution.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.solution.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-slate-700 pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
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
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-slate-900 uppercase text-sm tracking-wider">
                    {caseStudy.roadmap.heading}
                  </h3>
                  <div class="space-y-5">
                    {caseStudy.roadmap.items.map((item, i) => (
                      <div
                        key={i}
                        class="border-l-4 border-slate-900 pl-5 py-2"
                      >
                        <h4 class="font-semibold text-slate-900 mb-2 text-lg">
                          {item.title}
                        </h4>
                        <p class="text-slate-700 leading-relaxed">
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
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-slate-900 uppercase text-sm tracking-wider">
                    {caseStudy.approach.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.approach.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-slate-700 pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
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
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-slate-900 uppercase text-sm tracking-wider">
                    {caseStudy.insight.heading}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.insight.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-slate-700 pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
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
                  <h3 class="text-xl sm:text-2xl font-semibold mb-5 text-slate-900 uppercase text-sm tracking-wider">
                    {caseStudy.outcome.heading || "The Outcome"}
                  </h3>
                  <ul class="space-y-3">
                    {caseStudy.outcome.points.map((point, i) => (
                      <li
                        key={i}
                        class="text-slate-700 pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-slate-900 before:font-bold leading-relaxed"
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
        <Section width="narrow" class="border-t-2 border-slate-900">
          <div>
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-slate-900"
              style="font-family: var(--font-display);"
            >
              {otherExperience.heading}
            </h2>
            <p class="text-slate-700 mb-5 text-lg leading-relaxed">
              {otherExperience.text}
            </p>
            <p class="text-slate-600 italic leading-relaxed">
              {otherExperience.note}
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section class="border-t-2 border-slate-900" spacing="large">
          <div class="relative max-w-3xl mx-auto text-center">
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-slate-900"
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
