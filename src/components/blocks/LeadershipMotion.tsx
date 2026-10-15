"use client";

import { useLayoutEffect } from "react";

/** Runs the trusted interaction source supplied with the final standalone design. */
export function LeadershipMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".portfolio-final");
    if (!root) return;

    const documentElement = document.documentElement;
    documentElement.classList.add("js");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      documentElement.classList.add("intro-on");
    }

    const script = document.createElement("script");
    script.src = "/scripts/home-final.js";
    script.async = false;
    root.appendChild(script);

    return () => {
      script.remove();
      documentElement.classList.remove("js", "intro-on", "bar-early");
      documentElement.style.removeProperty("--barh");
    };
  }, []);

  return null;
}
