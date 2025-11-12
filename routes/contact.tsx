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
        <Section class="pt-12 sm:pt-16">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl sm:text-5xl font-bold mb-6">
              {contactHero.heading}
            </h1>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              {contactHero.intro}
            </p>
          </div>
        </Section>

        {/* What to Expect */}
        <Section>
          <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-semibold mb-6 text-center">
              {whatToExpect.heading}
            </h2>
            <ul class="space-y-3">
              {whatToExpect.points.map((point, index) => (
                <li
                  key={index}
                  class="text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Booking Options */}
        <Section class="bg-gray-50">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-semibold mb-8 text-center">
              {bookingInfo.heading}
            </h2>

            {/* Primary Booking - Google Calendar */}
            <div class="bg-white border-2 border-gray-900 rounded-lg p-8 mb-8 text-center">
              <h3 class="text-xl font-semibold mb-3">
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
            <div class="text-center mb-6">
              <p class="text-gray-600">{bookingInfo.alternativeText}</p>
            </div>

            <ContactForm />
          </div>
        </Section>

        {/* Other Contact Methods */}
        <Section>
          <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-semibold mb-6 text-center">
              {contactMethods.heading}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.methods.map((method, index) => (
                <div key={index} class="text-center">
                  <p class="text-sm font-medium text-gray-500 mb-1">
                    {method.label}
                  </p>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      class="text-gray-900 hover:underline"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p class="text-gray-900">{method.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Camplight Note */}
        <Section class="bg-gray-50">
          <div class="max-w-3xl mx-auto text-center">
            <p class="text-gray-700">
              {camplightNote.text}
              <a
                href={camplightNote.link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-900 font-medium hover:underline"
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
