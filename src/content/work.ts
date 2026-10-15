// Work page content - Case studies
export const workIntro = {
  heading: "Selected Projects",
};

export const caseStudies = [
  {
    id: "travel-chatbot",
    title: "Travel Discovery Chatbot",
    challenge: {
      heading: "The Challenge",
      points: [
        "Travel agency needed to convert paid ad traffic into qualified leads without growing the sales team",
        'Customers arrive with vague wishes ("a beach week in Turkey in July, around €1000"), not specific searches, so matching them to real offers took a salesperson\'s time',
        "Customers wanted to browse in natural, conversational Bulgarian, not fill out rigid search forms",
      ],
    },
    solution: {
      heading: "The Solution",
      points: [
        "Built an assistant that lets customers search with a simple form or by chatting in Bulgarian, the way they'd talk to a travel agent",
        "Searches two tour operators' live offers, so prices and availability are always current, and shows them as clickable offer cards",
        "Hands every interested customer to the sales team, together with what they were looking for",
        "Tracks which ads bring real leads, so ad spend goes where it works",
      ],
    },
    outcome: {
      heading: "The Outcome",
      points: [
        {
          text: "Live in production at ",
          href: "https://search.pochivki-turcia.bg",
          label: "search.pochivki-turcia.bg",
        },
        "Never drops a lead: if a tour operator's search fails, the assistant asks for the customer's contact details instead",
        "Hotel details load instantly instead of after a ten-second wait",
        "Every mistake a customer or the sales team reports becomes an automated test, so it doesn't come back",
        "Sales team engages warm prospects instead of fielding repetitive first-contact questions",
      ],
    },
  },
  {
    id: "hrani",
    title: "Automated Take-Home Review Assistant",
    challenge: {
      heading: "The Challenge",
      points: [
        "Engineering teams running take-home assignments burn senior time on submissions that don't warrant a second look",
        "Review quality and consistency drift over time and between reviewers",
        "Running candidate-submitted code safely is a genuine security problem",
      ],
    },
    solution: {
      heading: "The Solution",
      points: [
        "Built HRANI, an AI agent that reviews candidate take-home submissions and writes structured verdicts back into the team's existing Notion workflow",
        "Treats candidate code as untrusted: read-only local tools, with any execution forced through an isolated, secretless sandbox",
        "Produces schema-validated output (scores, strengths, weaknesses, hire/maybe/reject) instead of free-form prose, so verdicts are comparable and hard to game",
        "Event-driven serverless pipeline triggered by a status change in Notion, with no always-on infrastructure to maintain",
      ],
    },
    outcome: {
      heading: "The Outcome",
      points: [
        "Live in production, giving every submission a consistent first-pass review",
        "Reviewers' time goes to candidates that genuinely warrant a deeper look",
        "Structured, comparable verdicts keep the hiring bar steady across reviewers",
      ],
    },
  },
  {
    id: "ecommerce",
    title: "Multi-Store Order Processing with Agentic AI",
    challenge: {
      heading: "The Challenge",
      points: [
        "Power-tools retailer selling through six online stores, a physical shop and phone orders",
        "Order processing required significant manual operator intervention",
        "Operators spending time on routine decisions instead of complex cases",
      ],
    },
    solution: {
      heading: "The Solution",
      points: [
        "Built one back office where operators see every order from every store and phone sale, updating live",
        "Connected it to the accounting software and three courier services, so invoices, stock levels, shipping labels and delivery status don't need retyping",
        "Implemented an agentic AI system that handles routine order decisions and leaves the unusual cases to people",
        "Designing AI product suggestions that work from the product catalogue alone, so customer data never goes to an AI provider",
      ],
    },
    outcome: {
      heading: "The Outcome",
      points: [
        "Running the business's daily operations for six years, with me as their engineer throughout",
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
    title: "HVAC Systems Company - Digital Foundation",
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
      heading: "The Solution",
      points: [
        "Built and launched the company's first website",
        "Established a digital presence and lead-generation channel where there was none",
        "Structured the foundation so future automation can plug in cleanly (Event Sourcing principles for capturing operational data)",
      ],
    },
    roadmap: {
      heading: "What the Foundation Enables",
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
        "Start with digital strategy and foundation before automation",
        "Identify high-impact, low-risk automation opportunities",
        "Build systems that capture data for future AI use (Event Sourcing principles)",
        "Sequence work to match the business's real operational pain, not AI hype",
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
];

export const otherExperience = {
  heading: "Other Experience",
  text: "Over the years, I've worked across various domains, including FOREX trading automation with ML models, seven years on a hospital and clinic platform that holds patient records, and backend systems for a consumer-lending company. I know what it takes to keep sensitive customer data safe. Most projects involve connecting systems that weren't built to talk to each other.",
  note: "If you're wondering whether I've solved a problem similar to yours, let's talk. Chances are I've encountered something close.",
};

export const workCta = {
  text: "Have a Similar Challenge?",
  ctaText: "Book a Call",
  ctaLink: "/contact",
};
