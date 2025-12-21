// Work page content - Case studies
export const workIntro = {
  heading: "Selected Projects",
  intro:
    "I focus on business process automation and AI integration. Most of my work is under NDA, but here are a few projects I can discuss.",
};

export const caseStudies = [
  {
    id: "ecommerce",
    title: "E-Commerce Order Processing with Agentic AI",
    challenge: {
      heading: "The Challenge",
      points: [
        "E-commerce company with multiple sales channels (web + physical stores)",
        "Order processing required significant manual operator intervention",
        "Operators spending time on routine decisions instead of complex cases",
      ],
    },
    solution: {
      heading: "The Solution",
      points: [
        "Built centralized order processing platform on Kubernetes",
        "Implemented agentic AI system to handle routine order decisions",
        "Designed Event Sourcing architecture to capture decision context for AI training",
        "Integrated multiple data sources for unified order management",
      ],
    },
    outcome: {
      heading: "The Outcome",
      points: [
        "Operators freed to focus on edge cases requiring human judgment",
        "Faster order fulfillment across all channels",
        "System captures data for continuous AI improvement",
      ],
    },
  },
  {
    id: "insurance",
    title: "Insurance Broker AI Assistant",
    challenge: {
      heading: "The Challenge",
      points: [
        "Insurance broker needed to automate customer inquiry handling",
        "Complex product catalog requiring contextual understanding",
        "High volume of repetitive questions preventing focus on complex cases",
      ],
    },
    solution: {
      heading: "The Solution",
      points: [
        "Designed LLM-powered agent to handle initial customer inquiries",
        "Built system to understand insurance products and route appropriately",
        "Integrated with existing CRM for seamless handoff to human agents",
        "Created conversation templates for common inquiry patterns",
      ],
    },
    outcome: {
      heading: "The Outcome",
      points: [
        "Reduced response time for initial customer inquiries",
        "Freed brokers to focus on complex cases requiring expertise",
        "System learns from broker responses to improve over time",
      ],
    },
  },
  {
    id: "hvac",
    title: "HVAC Systems Company - Digital Foundation & Automation Roadmap",
    challenge: {
      heading: "The Challenge",
      points: [
        "B2B/commercial HVAC company managing projects manually",
        "Customer inquiries, quotes, and maintenance schedules handled via email and phone",
        "No centralized system for tracking equipment installations or maintenance cycles",
        "Inventory management largely manual",
      ],
    },
    solution: {
      heading: "Phase 1 - Foundation (Completed)",
      points: [
        "Built company website",
        "Established digital presence for lead generation",
        "Created foundation for future automation integration",
      ],
    },
    roadmap: {
      heading: "Phase 2 - Automation Roadmap (Planned)",
      items: [
        {
          title: "Maintenance Schedule Optimization",
          description:
            "Automate client maintenance reminders based on system installation dates and usage patterns",
        },
        {
          title: "Inventory Management",
          description:
            "Track parts across job sites, predict needs based on upcoming projects, automated reorder triggers",
        },
        {
          title: "Customer Portal",
          description:
            "Self-service for maintenance requests, documentation access, system history",
        },
      ],
    },
    approach: {
      heading: "The Approach",
      points: [
        "Start with digital foundation before automation",
        "Identify high-impact, low-risk automation opportunities",
        "Build systems that capture data for future AI use (Event Sourcing principles)",
        "Phased implementation aligned with business growth",
      ],
    },
    insight: {
      heading: "Key Insight",
      points: [
        "Most small B2B companies need digital infrastructure before AI automation",
        "The right foundation makes future automation straightforward",
        "ROI comes from solving real operational pain points, not chasing AI hype",
      ],
    },
  },
  {
    id: "iaea",
    title: "IAEA - Centralized CMS Management",
    challenge: {
      heading: "The Challenge",
      points: [
        "International Atomic Energy Agency managing numerous internal and external websites",
        "Needed centralized management and consistency across properties",
      ],
    },
    solution: {
      heading: "The Solution",
      points: [
        "Consulted on Drupal-based centralized website management architecture",
        "Designed system for unified content management across multiple sites",
        "Provided training to internal teams",
      ],
    },
    outcome: null,
  },
];

export const otherExperience = {
  heading: "Other Experience",
  text:
    "Over the years, I've worked across various domains including FOREX trading automation with ML models, healthcare systems, and fintech backend infrastructure. Most projects involve complex integrations, API design, and distributed systems architecture.",
  note:
    "If you're wondering whether I've solved a problem similar to yours, let's talk. Chances are I've encountered something close.",
};

export const workCta = {
  text: "Have a Similar Challenge?",
  ctaText: "Book a Call",
  ctaLink: "/contact",
};
