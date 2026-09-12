/** Figma 163:319. Only Productize has supplied content; other chapters are deferred. */
export const productizeContent = {
  id: "productize",
  header: {
    eyebrow: "A de-identified enterprise case study",
    title: "From scripts to systems of intelligence.",
  },
  quickLinks: [
    { label: "PRODUCTIZE", id: "productize" },
    { label: "TRANSFORM" },
    { label: "INTENT" },
    { label: "WHAT’S NEXT" },
  ],
  hero: {
    number: "01",
    eyebrow: "Productize the expertise",
    title: "The technology was powerful.  Access to it wasn’t.",
    description:
      "A decade of enterprise data expertise had created sophisticated capabilities. But much of that intelligence remained trapped in terminal workflows, scripts and the minds of experienced engineers.",
    facts: [
      { value: "~50", label: "Engineering-heavy organization" },
      { value: "12+ YEARS", label: "Enterprise data expertise" },
      { value: "MULTI-INDUSTRY", label: "Complex data problems" },
    ],
  },
  constraint: {
    eyebrow: "THE REAL CONSTRAINT",
    title: "The engineer was effectively the interface.",
    description:
      "Customer outcomes were strong. But accessing the technology depended heavily on expert knowledge.",
    diagram: [
      "BUSINESS PROBLEM",
      "DATA ENGINEER",
      "DECISION LOGIC",
      "OUTCOME",
      "TECHNICAL EXPERTISE",
      "SCRIPTS",
    ],
    findings: [
      {
        title: "Knowledge was concentrated",
        description: "Critical expertise was difficult to transfer.",
      },
      {
        title: "Delivery varied by expert",
        description:
          "Similar problems could take different paths depending on the engineer.",
      },
      {
        title: "Scale depended on people",
        description: "Expert intervention remained central to delivery.",
      },
    ],
  },
  complexity: {
    eyebrow: "THE HIDDEN COMPLEXITY",
    title: ["The product knew less", "than the people operating it."],
    description:
      "The challenge wasn’t simply to expose existing technology through a graphical interface. It was to understand the reasoning around it — and translate expert capability into product behavior.",
    columns: ["THE TECHNOLOGY PROVIDED", "THE EXPERT PROVIDED"],
    rows: [
      { observed: "Tools", mapped: "Context" },
      { observed: "Frameworks", mapped: "Sequence" },
      { observed: "Data capabilities", mapped: "Judgment" },
      { observed: "Data processing", mapped: "Decision logic\nProblem-solving" },
    ],
    callout: {
      label: "THE REAL DESIGN PROBLEM",
      text: "The technology wasn’t what needed translating.\nThe expert reasoning did.",
    },
  },
  mandate: {
    eyebrow: "THE MANDATE",
    title: ["Make the intelligence", "accessible."],
    description:
      "I joined in 2023 as Head of Design with a clear mandate: transform an expert-driven, terminal-based product into an experience people could operate without coding or data engineering expertise.",
    facts: [
      { value: "HEAD OF DESIGN", label: "2023" },
      { value: "60 DAYS", label: "Run to Win" },
      { value: "1 —> 2 DESIGNERS", label: "First 30 days: solo" },
    ],
    callout: {
      label: "THE OBJECTIVE",
      text: "Not to reinvent the underlying technology.\nTo make its capabilities understandable, operable and scalable.",
    },
  },
  approach: {
    eyebrow: "THE APPROACH",
    title: "I started with the engineers, not the interface.",
    description:
      "For the first month, I worked across data engineering, technology and business leadership to reconstruct how complex data problems were actually solved.\n\nI wasn't mapping their actions. I was trying to understand the reasoning behind them.",
    columns: ["WHAT I OBSERVED", "WHAT I MAPPED"],
    rows: [
      {
        observed: "Daily workflows\nTerminal scripts",
        mapped: "INTENT",
        question: "What problem are we solving?",
      },
      {
        observed: "Technical choices",
        mapped: "CRITERIA",
        question: "What factors shape the decision?",
      },
      {
        observed: "Variations in approach",
        mapped: "DECISIONS",
        question: "Why this approach over another?",
      },
      {
        observed: "Dependencies",
        mapped: "SEQUENCE",
        question: "What determines what happens next?",
      },
      {
        observed: "Course corrections",
        mapped: "EXCEPTIONS",
        question: "What makes the path change?",
      },
      {
        observed: "Delivery outcomes",
        mapped: "OUTCOMES",
        question: "How do we know it worked?",
      },
    ],
    callout: {
      label: "THE DISCOVERY",
      text: "I wasn't documenting software steps.\nI was mapping how experts reasoned.",
    },
  },
  synthesis: {
    eyebrow: "THE SYNTHESIS",
    title: [
      "Different experts took different paths.",
      "Recurring patterns began to emerge.",
    ],
    description:
      "I compared workflows, scripts and decision logic across engineers and use cases — looking for recurring patterns beneath individual approaches. Those patterns became the foundation for a shared product blueprint.",
    stages: [
      {
        label: "VARIATION",
        title: "EXPERT PATHS",
        items: ["DIFFERENT ENGINEERS", "DIFFERENT USE CASES", "DIFFERENT APPROACHES"],
      },
      {
        label: "ABSTRACTION",
        title: "RECURRING PATTERNS",
        items: [
          "INTENT",
          "CRITERIA",
          "DECISIONS",
          "SEQUENCE",
          "EXCEPTIONS",
          "OUTCOMES",
        ],
      },
      {
        label: "STRUCTURE",
        title: "PRODUCT BLUEPRINT",
        items: ["CAPABILITIES", "WORKFLOWS", "INTERACTIONS", "GOVERNANCE"],
      },
    ],
    callout: {
      label: "THE SHIFT",
      text: "From designing around how engineers worked to designing around how problems were solved.",
    },
  },
  productization: {
    eyebrow: "THE PRODUCTIZATION",
    title: "Expert reasoning became product behavior.",
    description:
      "The blueprint encoded recurring expert logic into a guided product experience — preserving the underlying capability while removing coding as the primary way to access it.",
    visualTitle: "DISCOVER CONNECTIONS",
    visualDescription: "Reveal relationships hidden across fragmented data.",
    callout: {
      label: "THE SHIFT",
      text: "The expertise didn't disappear. It moved into the product.",
    },
  },
} as const;

export type ProductizeContent = typeof productizeContent;
