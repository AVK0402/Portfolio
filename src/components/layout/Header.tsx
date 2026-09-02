import Link from "next/link";
import { Container } from "./Container";
import { Navigation } from "./Navigation";
import { siteConfig } from "@/config/site";

/**
 * Site header: identity + primary navigation.
 * Minimal and server-rendered; interactivity (mobile menu) is added
 * inside Navigation only when the design phase requires it.
 */
export function Header() {
  return (
    <header>
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="font-semibold">
          {siteConfig.name}
        </Link>
        <Navigation />
      </Container>
    </header>
  );
}
