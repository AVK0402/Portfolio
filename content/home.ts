import { routes } from "@/config/navigation";

/** Exact copy from Figma V817xNNWNd29akCHsBjVY4, node 146:3. */
export const homeContent = {
  hero: {
    title: ["Designing the Future", "of Human Intelligence."],
    description:
      "I lead design and product organizations at pivotal moments, building the teams, systems, and strategy that turn businesses ambition into outcomes.",
    disciplines: "DESIGN . PRODUCT . AI . LEADERSHIP",
    cta: { label: "LET’S CONNECT", href: routes.contact },
    closing: "Design . Technology . Business . Human Potential",
  },
  pointOfView: {
    eyebrow: "MY POINT OF VIEW",
    title: "Make the complex understandable.",
    description:
      "Every organization I have led has faced the same tension — the pace of change outrunning the clarity to act on it. I believe leadership’s job is to close that gap: turning ambiguity into direction, and direction into results.",
    items: [
      {
        title: "Complexity is an opportunity",
        description:
          "The harder the problem, the greater the leadership required. I bring together people, disciplines, and systems to find the shape inside the noise.",
      },
      {
        title: "Design shapes the business",
        description:
          "Good judgement shouldn’t sit at the edges of a company. It belongs in strategy, in the room where priorities get set, deciding what actually survives contact with the market.",
      },
      {
        title: "Great design scales through people",
        description:
          "Craft alone doesn’t scale; culture does. i build the teams and capability that let sound judgement show up in every decision, not just the ones I make myself.",
      },
    ],
    closing: "Make technology human. Make design matter.",
  },
  credibility: {
    eyebrow: "SCALE & CREDIBILITY",
    title: ["Every chapter built", "the capability for the next."],
    description:
      "From founding a venture to leading design at global enterprises, I have moved through disciplines by design, not accident, carrying what each one taught me into the next.",
    chapters: [
      { discipline: "Art", lesson: " taught me to see." },
      { discipline: "Design", lesson: " taught me to shape." },
      { discipline: "UX", lesson: " taught me to understand" },
      { discipline: "Product", lesson: " taught me to prioritize." },
      { discipline: "Leadership", lesson: " taught me to scale." },
      { discipline: "AI", lesson: " is challenging me to rethink what’s possible." },
    ],
    recognitionLabel: "SELECTED RECOGNITION",
    recognition: [
      {
        title: "Top 250 Great Managers, India",
        detail: "Economic Times 2021",
        company: "Indegene",
      },
      {
        title: "Design Focus Award",
        detail: "Product Engineering",
        company: "Software AG",
      },
      {
        title: "Best Contributor",
        detail: "Branding & Communication",
        company: "Infosys",
      },
      { title: "Bravo Award", detail: "Design Excellence", company: "Walmart Labs" },
    ],
  },
  capabilities: {
    eyebrow: "WHAT I BUILD",
    title: ["Ownership across", "the whole system."],
    description:
      "My work spans strategy to execution — Not just the visible experience, but the systems, teams, and decisions behind it. This is where design, engineering, product and business meet.",
    items: [
      {
        title: "Design organizations",
        description: "Built from the ground up or reshaped to operate at scale.",
      },
      {
        title: "Product & enterprise strategy",
        description: "Connecting design decisions to what the business measures.",
      },
      {
        title: "AI-powered experiences",
        description:
          "Pushing what’s possible when intelligence becomes a design material.",
      },
    ],
    closing:
      "The work starts before the roadmap is set — when the problem, priorities, and possibilities are still taking shape.",
  },
  featured: {
    eyebrow: "FEATURED WORK",
    title: "Transformation is never just a product problem.",
    description:
      "One complex enterprise challenge, viewed through the interconnected forces that shaped the product, the organization, and the business.",
    diagram: {
      labels: ["WHERE IT STARTED", "HOW IT SCALED", "WHAT IT PROVED"],
      center: "SYSTEM",
    },
    caseStudy: {
      eyebrow: "A de-identified enterprise case study",
      title: "Reimagining a complex enterprise platform.",
      outcomes: [
        { title: "Product", description: "Complexity to coherence" },
        { title: "Organization", description: "Capability to scale" },
        { title: "Business", description: "Decisions to outcomes" },
      ],
      cta: { label: "EXPLORE THE CASE", href: routes.work },
    },
  },
} as const;

export type HomeContent = typeof homeContent;
