/**
 * Route paths — the single definition of the site's URL structure.
 * Pages and components must derive hrefs from here, never inline them.
 */
export const routes = {
  home: "/",
  about: "/about",
  work: "/work",
  caseStudy: (slug: string) => `/work/${slug}`,
  values: "/values",
  speaking: "/speaking",
  ideas: "/ideas",
  article: (slug: string) => `/ideas/${slug}`,
  resume: "/resume",
  contact: "/contact",
} as const;
