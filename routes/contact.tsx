import { define } from "../utils.ts";
import PageLayout from "../components/PageLayout.tsx";
import Section from "../components/Section.tsx";
import Button from "../components/Button.tsx";
import SEO from "../components/SEO.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import {
  contactHero,
  whatToExpect,
  bookingInfo,
  contactMethods,
  camplightNote,
} from "../content/contact.ts";

export default define.page(function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Book a discovery call or get in touch about your automation project. No sales pitch - just an honest conversation about your challenges."
        path="/contact"
      />
      <PageLayout currentPath="/contact">
        {/* Hero */}
        <Section class="pt-16 sm:pt-20 pb-12 sm:pb-16 gradient-hero">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {contactHero.heading}
            </h1>
            <p class="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              {contactHero.intro}
            </p>
          </div>
        </Section>

        {/* What to Expect */}
        <Section>
          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold mb-10 text-center gradient-text">
              {whatToExpect.heading}
            </h2>
            <ul class="space-y-4">
              {whatToExpect.points.map((point, index) => (
                <li
                  key={index}
                  class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-teal-600 before:font-bold leading-relaxed text-lg"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Booking Options */}
        <Section class="bg-gradient-to-b from-gray-50 to-white">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold mb-12 text-center gradient-text">
              {bookingInfo.heading}
            </h2>

            {/* Primary Booking - Google Calendar */}
            <div class="bg-white border-2 border-teal-600 rounded-xl p-10 mb-10 text-center shadow-card hover:shadow-hover transition-smooth">
              <h3 class="text-2xl font-bold mb-4 text-gray-900">
                {bookingInfo.primaryBooking.text}
              </h3>
              <Button
                href={bookingInfo.primaryBooking.url}
                variant="primary"
                class="mt-6"
              >
                {bookingInfo.primaryBooking.ctaText}
              </Button>
            </div>

            {/* Alternative - Contact Form */}
            <div class="text-center mb-8">
              <p class="text-gray-700 text-lg font-medium">{bookingInfo.alternativeText}</p>
            </div>

            <ContactForm />
          </div>
        </Section>

        {/* Other Contact Methods */}
        <Section>
          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold mb-10 text-center gradient-text">
              {contactMethods.heading}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactMethods.methods.map((method, index) => (
                <div key={index} class="text-center p-6 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-smooth">
                  <p class="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
                    {method.label}
                  </p>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      class="text-teal-600 hover:text-teal-700 font-semibold text-lg link-underline transition-smooth"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p class="text-gray-900 font-semibold text-lg">{method.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Camplight Note */}
        <Section class="bg-gradient-to-b from-gray-50 to-white">
          <div class="max-w-3xl mx-auto text-center">
            <p class="text-gray-700 text-lg leading-relaxed">
              {camplightNote.text}
              <a
                href={camplightNote.link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-teal-600 font-semibold hover:text-teal-700 link-underline transition-smooth"
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
