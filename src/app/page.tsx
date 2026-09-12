import { getHome } from "@/lib/content/getHome";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { HomeHero } from "@/components/blocks/HomeHero";
import { HomePerspective } from "@/components/blocks/HomePerspective";
import { HomeCredibility } from "@/components/blocks/HomeCredibility";
import { HomeCapabilities } from "@/components/blocks/HomeCapabilities";
import { FeaturedWork } from "@/components/work/FeaturedWork";

export const metadata = buildMetadata({
  title: siteConfig.name,
  description: getHome().hero.description,
});
metadata.title = { absolute: siteConfig.name };

export default function Home() {
  const content = getHome();
  return (
    <main id="main-content" className="portfolio-home">
      <HomeHero content={content.hero} />
      <HomePerspective content={content.pointOfView} />
      <HomeCredibility content={content.credibility} />
      <HomeCapabilities content={content.capabilities} />
      <FeaturedWork content={content.featured} />
    </main>
  );
}
