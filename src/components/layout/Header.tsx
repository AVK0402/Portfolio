"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/components/ui/Link";
import { routes } from "@/config/navigation";
import { Container } from "./Container";
import { Navigation } from "./Navigation";
import { siteConfig } from "@/config/site";

/**
 * Site header: identity + primary navigation.
 * Shares its measured height with secondary sticky navigation when text wraps.
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    });
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);
  return (
    <header ref={headerRef} className="site-header">
      <Container className="site-header-inner">
        <div>
          <Link href={routes.home} className="site-name">
            {siteConfig.name}
          </Link>
          <p className="site-role">{siteConfig.author.role}</p>
        </div>
        <Navigation />
      </Container>
    </header>
  );
}
