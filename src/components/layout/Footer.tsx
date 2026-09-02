import { Container } from "./Container";
import { siteConfig } from "@/config/site";

/** Site footer. Structure only — copy arrives in the content phase. */
export function Footer() {
  return (
    <footer>
      <Container className="py-10">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
