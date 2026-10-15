// About page content
import portrait from "../assets/martin-portrait.jpg";

export const aboutHero = {
  heading: "Hi, I'm Martin",
};

export const aboutPhoto = {
  src: portrait,
  alt: "Martin Martinov",
  width: 450,
};

export const story = {
  heading: "The Story",
  paragraphs: [
    "I wrote my first code in 1996 at age 11 on an 8-bit machine at a local computer club. Once I got my own PC - a 386 with 1MB of RAM - there was no turning back. In my late teens I was writing x86 assembly.",
    "As an introvert, I was drawn to programming because computers are predictable - they do exactly what you tell them. The irony is that software engineering is fundamentally about people: stakeholders, teammates, users. I've grown to enjoy that collaboration as much as the code.",
    "Decades of building software took me from Sofia to Copenhagen, Vienna, Munich, and London. I've shipped CRMs and ERPs, led teams, consulted for the IAEA, and learned that the best solutions come from understanding the problem deeply before writing any code.",
    "Now I'm back home in Bulgaria with my family. Currently Solutions Architect and co-owner of Camplight cooperative, doing the work I love with clients across Europe and the US.",
  ],
};

export const professionalJourney = {
  heading: "Professional Journey",
  milestones: [
    "Early career: Built bespoke CRM systems, Drupal sites, and e-commerce stores",
    "Mid-career: Led teams, specialized in complex integrations and data migrations across finance, insurance, healthcare, e-commerce, and corporate training",
    "Recent focus: Business process automation (with or without AI), agentic workflows, LLMs, Event Sourcing",
  ],
};

export const howIWork = {
  heading: "How I Work",
  points: [
    "For fast and nimble, focused engagements: Direct collaboration through my consultancy",
    {
      text: "Larger projects: I assemble and lead a team through Camplight cooperative - we are a technical partner to dozen of established businesses",
      link: {
        text: "Camplight",
        url: "https://camplight.net?utm_source=mmartinov.com&utm_medium=about-page&utm_campaign=personal-site-referral",
      },
    },
    "Either way, I stay hands-on and focus on delivering clear automation ROI.",
  ],
};

export const beyondWork = {
  heading: "Beyond Work",
  interests: [
    "Rock climbing (sport, trad, alpine, multi-pitch)",
    "Motorcycling (road and off-road). Proud KTM owner.",
  ],
};

export const technicalApproach = {
  heading: "Technical Approach",
  points: [
    "I design systems that capture everything that happens - not just current state - so future AI/ML and analytics don't hit dead ends",
    "I prove value with small, focused implementations before scaling up",
    "I've seen too many projects fail from overbuilding - I keep things simple until complexity is earned",
    "I design with security, privacy, sustainability and open source in mind",
  ],
};

export const aboutCta = {
  text: "Want to Work Together?",
  ctaText: "Book a Call",
  ctaLink: "/contact",
};
