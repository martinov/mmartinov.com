import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import {
  bookingInfo,
  camplightNote,
  contactHero,
  contactMethods,
  whatToExpect,
} from "../content/contact.ts";
import { generateToken } from "../utils/antispam.ts";

export default define.page(async function Contact() {
  const antispamToken = await generateToken();
  return (
    <>
      <SEO
        title="Contact"
        description="Book a discovery call or get in touch about your automation project. No sales pitch - just an honest conversation about your challenges."
        path="/contact"
      />
      <PageLayout currentPath="/contact">
        {/* Hero */}
        <Section class="pt-12 sm:pt-16" width="narrow" spacing="large">
          <div class="text-center">
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-gray-900"
              style="font-family: var(--font-display);"
            >
              {contactHero.heading}
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {contactHero.intro}
            </p>
          </div>
        </Section>

        {/* What to Expect */}
        <Section width="narrow">
          <div>
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 text-center text-teal-700"
              style="font-family: var(--font-display);"
            >
              {whatToExpect.heading}
            </h2>
            <ul class="space-y-4">
              {whatToExpect.points.map((point, index) => (
                <li
                  key={index}
                  class="text-gray-700 text-lg pl-7 relative before:content-['✓'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Booking Options */}
        <Section
          class="bg-gradient-to-br from-gray-50 to-gray-100/30"
          width="narrow"
          spacing="large"
        >
          <div>
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-10 text-center text-gray-900"
              style="font-family: var(--font-display);"
            >
              {bookingInfo.heading}
            </h2>

            {/* Primary Booking - Google Calendar */}
            <div class="bg-white border-2 border-teal-600 rounded-2xl p-8 lg:p-10 mb-10 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3
                class="text-xl sm:text-2xl font-semibold mb-4 text-gray-900"
                style="font-family: var(--font-display);"
              >
                {bookingInfo.primaryBooking.text}
              </h3>
              <Button
                href={bookingInfo.primaryBooking.url}
                variant="primary"
                class="mt-4"
              >
                {bookingInfo.primaryBooking.ctaText}
              </Button>
            </div>

            {/* Alternative - Contact Form */}
            <div class="text-center mb-8">
              <p class="text-gray-600 text-lg">{bookingInfo.alternativeText}</p>
            </div>

            <ContactForm antispamToken={antispamToken} />
          </div>
        </Section>

        {/* Other Contact Methods */}
        <Section width="narrow">
          <div>
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-10 text-center text-gray-900"
              style="font-family: var(--font-display);"
            >
              {contactMethods.heading}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactMethods.methods.map((method, index) => (
                <div
                  key={index}
                  class="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 hover:border-teal-300 transition-colors duration-300"
                >
                  <p class="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    {method.label}
                  </p>
                  {method.href
                    ? (
                      <a
                        href={method.href}
                        target={method.href.startsWith("http")
                          ? "_blank"
                          : undefined}
                        rel={method.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined}
                        class="text-teal-600 font-medium hover:text-teal-800 transition-colors duration-300 underline decoration-teal-300 hover:decoration-teal-500 underline-offset-2"
                      >
                        {method.value}
                      </a>
                    )
                    : <p class="text-gray-900 font-medium">{method.value}</p>}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Camplight Note */}
        <Section
          class="bg-gradient-to-br from-teal-50/60 to-blue-50/40 border-y border-teal-100/60"
          width="narrow"
        >
          <div class="text-center">
            <p class="text-gray-700 text-lg leading-relaxed">
              {camplightNote.text}
              <a
                href="https://camplight.net?utm_source=mmartinov.com&utm_medium=contact-page&utm_campaign=personal-site-referral"
                target="_blank"
                rel="noopener"
                class="text-teal-600 font-semibold hover:text-teal-800 transition-colors duration-300 underline decoration-teal-300 hover:decoration-teal-500 underline-offset-2"
              >
                {camplightNote.link.text}
              </a>
              .
            </p>
          </div>
        </Section>
      </PageLayout>
    </>
  );
});
