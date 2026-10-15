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
    "I'll assess your situation and recommend the best path forward",
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
      label: "LinkedIn",
      value: "linkedin.com/in/martinov",
      href: "https://www.linkedin.com/in/martinov/",
    },
    {
      label: "GitHub",
      value: "github.com/martinov",
      href: "https://github.com/martinov/",
    },
  ],
};

export const camplightNote = {
  text: "For team-based projects or product development partnerships, check out ",
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
