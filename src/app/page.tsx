import { getHome } from "@/lib/content/getHome";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { LeadershipHome } from "@/components/blocks/LeadershipHome";

export const metadata = buildMetadata({
  title: siteConfig.name,
  description: getHome().hero.description,
});
metadata.title = { absolute: siteConfig.name };

export default function Home() {
  return <LeadershipHome content={getHome()} />;
}
