# Martin Martinov Consulting Website - Technical Specification

Domain name: mmartinov.com

## Project Overview

**Purpose:** Personal consulting brand website for Martin Martinov - software architect specializing in business process automation and AI integration for small-to-mid-sized companies.

**Target Audience:**
- Non-technical CEOs who recognize they need automation
- Technical founders/CTOs at small-mid B2B/B2C companies
- Companies with messy workflows and manual processes
- Businesses that want direct engagement (vs agency/cooperative model)

**Primary Goals:**
1. Establish credibility and expertise
2. Showcase relevant case studies
3. Filter for qualified leads
4. Drive discovery call bookings

**Tone & Style:**
- Professional but approachable
- Authentic, no corporate buzzwords
- Example-driven, not credential-focused
- Clear and direct communication

---

## Site Structure

### 1. Homepage (/)

**Hero Section:**
- **Headline:** "Software architect specializing in business process automation and AI integration"
- **Subheadline:** "I help companies eliminate repetitive manual work so teams can focus on what actually matters. 20+ years of experience building systems that work."
- **Primary CTA:** "View My Work" (scroll to work section or link to /work)
- **Secondary CTA:** "Book a Discovery Call"

**Credibility Band:**
- Quick facts display (horizontal layout):
  - "20+ years of software development"
  - "Co-owner @ Camplight" (link to camplight.net)
  - "Former IAEA consultant"
  - Industry agnostic (fintech, edtech, healthcare)

**What I Do Section:**
- Heading: "What I Actually Do"
- Three problems/solutions:

  **1. Process Automation That Works**
  - Problem: Manual processes eating your team's time
  - Solution: Build automation systems that handle the repetitive work reliably

  **2. AI Integration for Real Business Problems**
  - Problem: AI hype vs actual value
  - Solution: Design and implement LLM agents and AI workflows that solve specific, measurable problems

  **3. System Architecture & Technical Strategy**
  - Problem: Technical decisions that lock you in or slow you down
  - Solution: Design systems with Event Sourcing and modern patterns that adapt as your business grows

**Recent Work Section:**
- Heading: "Recent Projects"
- 2-3 case study cards with:
  - Project type
  - Brief description (2-3 sentences)
  - Key outcome/metric
  - Link to full case study
- CTA: "See All Work" → /work

**About Preview:**
- Brief personal section (2-3 sentences)
- "I coded my first program in 1996 on an 8-bit computer. Today I have 20+ years building systems across finance, insurance, healthcare, and e-commerce. When I'm not working, you'll find me rock climbing or riding motorcycles."
- CTA: "More About Me" → /about

**Final CTA Section:**
- Heading: "Ready to Automate the Boring Stuff?"
- Text: "Let's talk about your processes, your challenges, and whether automation makes sense for you."
- CTA: "Book a 30-Minute Call" (link to Calendly or contact page)

---

### 2. Work Page (/work)

**Page Heading:** "Selected Projects"
**Intro:** "I focus on business process automation and AI integration. Most of my work is under NDA, but here are a few projects I can discuss."

**Case Study 1: E-Commerce Order Fulfillment with Agentic AI**

*Status: Can be discussed freely (verify with client before publishing)*

- **The Challenge:**
  - E-commerce company with multiple sales channels (web + physical stores)
  - Order processing required significant manual operator intervention
  - Operators spending time on routine decisions instead of complex cases

- **The Solution:**
  - Built centralized order processing platform on Kubernetes
  - Implemented agentic AI system to handle routine order decisions
  - Designed Event Sourcing architecture to capture decision context for AI training
  - Integrated multiple data sources for unified order management

- **The Outcome:**
  - Operators freed to focus on edge cases requiring human judgment
  - Faster order fulfillment across all channels
  - System captures data for continuous AI improvement

**Case Study 2: Insurance Broker AI Assistant**

*Status: Brief mention only (under NDA, not yet production)*

- **The Challenge:**
  - Insurance broker needed to automate customer inquiry handling
  - Complex product catalog requiring contextual understanding

- **The Approach:**
  - Building LLM-powered agent to handle initial customer inquiries
  - System understands insurance products and routes appropriately
  - Currently in development

- **Note:** Full case study available once project is in production

**Case Study 3: HVAC Systems Company - Digital Foundation & Automation Roadmap**

*Status: Can discuss (family business, website live)*

- **The Challenge:**
  - B2B/commercial HVAC company managing projects manually
  - Customer inquiries, quotes, and maintenance schedules handled via email and phone
  - No centralized system for tracking equipment installations or maintenance cycles
  - Inventory management largely manual

- **Phase 1 - Foundation (Completed):**
  - Built company website
  - Established digital presence for lead generation
  - Created foundation for future automation integration

- **Phase 2 - Automation Roadmap (Planned):**
  - **Maintenance Schedule Optimization:** Automate client maintenance reminders based on system installation dates and usage patterns
  - **Inventory Management:** Track parts across job sites, predict needs based on upcoming projects, automated reorder triggers
  - **Customer Portal:** Self-service for maintenance requests, documentation access, system history

- **The Approach:**
  - Start with digital foundation before automation
  - Identify high-impact, low-risk automation opportunities
  - Build systems that capture data for future AI use (Event Sourcing principles)
  - Phased implementation aligned with business growth

- **Key Insight:**
  - Most small B2B companies need digital infrastructure before AI automation
  - The right foundation makes future automation straightforward
  - ROI comes from solving real operational pain points, not chasing AI hype

**Case Study 4: IAEA - Centralized CMS Management**

*Status: Can mention generally (Drupal-specific, historical)*

- **The Challenge:**
  - International Atomic Energy Agency managing numerous internal and external websites
  - Needed centralized management and consistency across properties

- **The Solution:**
  - Consulted on Drupal-based centralized website management architecture
  - Designed system for unified content management across multiple sites
  - Provided training to internal teams

**Other Experience:**
- Brief mention of other domains: FOREX trading automation with ML models, healthcare systems, fintech backend systems
- Note: "Most of my work involves complex integrations, API design, and backend systems. If you want to know whether I've solved a problem similar to yours, just ask."

**CTA:** "Have a Similar Challenge?" → Book a call

---

### 3. About Page (/about)

**Heading:** "Hi, I'm Martin"

**The Story:**
- Born in Pleven, Bulgaria
- Started coding in 1996 at age 11 on an 8-bit computer
- Moved to Sofia and started software engineering career
- 20+ years of commercial software development experience
- Lived and worked across multiple countries: Bulgaria, Denmark, Germany, Austria, UK
- Former IAEA consultant
- Moved back to Pleven with fiancé, had a son (he's 3 years old now, almost 4)
- Currently: Principal Engineer and co-owner of Camplight cooperative

**Professional Journey:**
- Early career: Built 4 bespoke CRM systems from scratch
- Mid-career: Led teams, specialized in complex integrations and data migrations
- Recent focus: AI automation, LLM agents, Event Sourcing, system architecture
- Experience spans: Finance, insurance, healthcare, e-commerce, NGOs

**How I Work:**
- I work remotely from Bulgaria and collaborate with clients globally
- For larger projects with bigger budgets: I work through [Camplight](https://camplight.net) - a validation-first product cooperative
- For direct consulting and smaller engagements: I work independently
- I focus on projects where automation provides clear ROI

**Beyond Work:**
- Rock climbing (sport, trad, alpine, multi-pitch)
- Motorcycling (road and off-road)
- Open source enthusiast

**Technical Approach:**
- Prefer Event Sourcing for new systems (captures decision context for future AI use)
- Focus on proving value before building
- Pragmatic about technology choices - right tool for the job
- Experience with: Python, JavaScript/TypeScript, PHP, C/C++/C#, multiple databases, Docker, AWS, GCP

**CTA:** "Want to Work Together?" → Book a call

---

### 4. Contact/Book Page (/contact)

**Heading:** "Let's Talk"

**Intro:**
"I take on a limited number of consulting projects each year. If you're dealing with manual processes that could be automated, or you're exploring AI integration, let's have a conversation."

**What to Expect:**
- 30-minute discovery call
- No sales pitch - just an honest conversation about your challenges
- I'll tell you if I think I can help (and if I can't, I might know who can)

**Booking Options:**
1. **Primary:** Calendly embed/link for direct booking
2. **Alternative:** Email form with fields:
   - Name
   - Email
   - Company
   - Brief description of challenge/project
   - Preferred time for call

**Other Ways to Connect:**
- Email: me@mmartinov.com
- LinkedIn: https://www.linkedin.com/in/martinov/
- GitHub: https://github.com/martinov/
- Location: Pleven, Bulgaria 🇧🇬 (Working remotely, available globally)

**Note:** "For larger projects or if you're looking for a validation-first product partner, check out [Camplight](https://camplight.net)."

---

## Technical Requirements

### Stack Preferences:
- Deno 2.5
- Fresh 2 with vite
- Focus: Fast, simple, easy to maintain
- Make sure we're using latest stable libraries / dependencies

### Design Requirements:
- Clean, professional, minimal
- Fast loading
- Mobile responsive
- No unnecessary animations or complexity
- Clear typography and readability
- Accessible (semantic HTML, good contrast)

### Content Requirements:
- All text should be editable (no hardcoded content if possible)
- Easy to add/update case studies
- Simple to maintain without deep technical knowledge

### Deployment:
- Easy deployment process
- Consider: Deno Deploy or similar
- Custom domain: mmartinov.com

### Forms & Booking:
- Contact form
- Calendly embed for booking (or alternative booking system)

### Analytics:
- Basic analytics (Plausible or similar privacy-focused option preferred)
- Track: page views, booking clicks, case study engagement

---

## Content Style Guide

### Voice & Tone:
- **Direct and honest:** No corporate speak or buzzwords
- **Confident but humble:** Show expertise without arrogance
- **Example-driven:** Prefer concrete examples over abstract claims
- **Professional but human:** Approachable expert, not corporate robot

### Writing Principles:
- Short paragraphs (2-4 sentences max)
- Avoid: "leverage," "synergy," "disruptive," "cutting-edge"
- Use: "build," "solve," "automate," "design," "implement"
- Specific over generic: "Built agentic AI for order fulfillment" not "Created innovative AI solutions"

### Forbidden Phrases:
- "Thought leader"
- "Guru" / "Ninja" / "Rock star"
- "Passionate about" (show, don't tell)
- "Best in class"
- "Cutting-edge solutions"

---

## Navigation Structure

**Primary Navigation:**
- Home
- Work
- About
- Contact

**Footer:**
- Links: LinkedIn, GitHub, Email
- Location: Pleven, Bulgaria
- Note: "Also co-owner of [Camplight](https://camplight.net)"
- Copyright: © 2025 Martin Martinov

---

## Key Differentiators to Emphasize

1. **Co-ownership of Camplight:** Signals ethics, collaboration, not just another contractor
2. **Event Sourcing approach:** Technical depth, forward-thinking
3. **"Automate the boring stuff" philosophy:** Clear point of view
4. **Cross-platform experience:** Finance, insurance, healthcare, e-commerce
5. **AI integration since before the hype:** FOREX ML models, now LLM agents
6. **Global collaboration from Bulgaria:** Remote work, timezone flexibility

---

## Success Metrics

**Primary:**
- Discovery call bookings per month
- Quality of inbound leads (right-fit projects)

**Secondary:**
- Time spent on Work page
- Case study read-through rate
- Email form submissions

---

## Next Steps

1. **Design mockups:** Create visual direction (optional - can design in browser)
2. **Tech stack decision:** Choose static site generator or approach
3. **Content finalization:**
   - Verify e-commerce case study with client
   - Gather any additional project details
   - Confirm Calendly/booking setup
4. **Development:** Build site based on this spec
5. **Review & iterate:** Martin reviews, provides feedback
6. **Deploy:** Launch to mmartinov.com

---

*This specification created: November 2025*
*To be implemented by: Claude Code or human developer*
*Contact: me@mmartinov.com*
