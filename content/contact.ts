// Contact page content
export const contactHero = {
  heading: "Let's Talk",
  intro:
    "I take on a limited number of consulting projects each year. If you're dealing with manual processes that could be automated, or you're exploring AI integration, let's have a conversation.",
};

export const whatToExpect = {
  heading: "What to Expect",
  points: [
    "30-minute discovery call",
    "No sales pitch - just an honest conversation about your challenges",
    "I'll tell you if I think I can help (and if I can't, I might know who can)",
  ],
};

export const bookingInfo = {
  heading: "Booking Options",
  primaryBooking: {
    text: "Google Calendar link for direct booking",
    url: "https://calendar.app.google/QyDm9yt2LodPDp2P9",
    ctaText: "Book a Call",
  },
  alternativeText: "Or send me a message using the form below",
};

export const contactMethods = {
  heading: "Other Ways to Connect",
  methods: [
    {
      label: "Email",
      value: "me@mmartinov.com",
      href: "mailto:me@mmartinov.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/martinov",
      href: "https://www.linkedin.com/in/martinov/",
    },
    {
      label: "GitHub",
      value: "github.com/martinov",
      href: "https://github.com/martinov/",
    },
    { label: "Location", value: "Pleven, Bulgaria 🇧🇬", href: null },
  ],
};

export const camplightNote = {
  text:
    "For larger projects or if you're looking for a validation-first product partner, check out ",
  link: { text: "Camplight", url: "https://camplight.net" },
};

export const formFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "your@email.com",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    required: false,
    placeholder: "Your company (optional)",
  },
  {
    name: "message",
    label: "Brief description of challenge/project",
    type: "textarea",
    required: true,
    placeholder: "Tell me about your challenge or project...",
    rows: 5,
  },
  {
    name: "preferredTime",
    label: "Preferred time for call",
    type: "text",
    required: false,
    placeholder: "e.g., Next week, mornings EST",
  },
];
