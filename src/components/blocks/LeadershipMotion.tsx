"use client";

import { useEffect, useRef } from "react";

type AmbientNode = { x: number; y: number; vx: number; vy: number };
type TargetPoint = { tx: number; ty: number; group: number };
type Particle = TargetPoint & {
  human: boolean;
  sx: number;
  sy: number;
  mx: number;
  my: number;
  phase: number;
  delay: number;
  x: number;
  y: number;
  progress: number;
};

export function LeadershipMotion({ title }: { title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest<HTMLElement>(".lead-hero");
    const root = canvas?.closest<HTMLElement>(".leadership-home");
    const heading = section?.querySelector<HTMLElement>("h1");
    if (!canvas || !section || !root || !heading) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let ambient: AmbientNode[] = [];
    let ambientAlpha = 0;
    let pointer: { x: number; y: number } | null = null;
    let visible = true;
    let mode: "intro" | "ambient" = "intro";
    let ambientFrame = 0;
    let introFrame = 0;
    let scrollFrame = 0;
    let heroTimer = 0;
    let introStarted = false;
    let removeSkipListeners = () => {};
    const heroAnimations: Animation[] = [];
    const revealAnimations: Animation[] = [];
    const skipEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

    const sizeCanvas = () => {
      const bounds = section.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const density = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
    };

    const seedAmbient = () => {
      const count = width < 700 ? 34 : 70;
      ambient = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const drawAmbient = (step: boolean) => {
      if (step) {
        ambientAlpha = Math.min(1, ambientAlpha + 0.01);
        ambient.forEach((node) => {
          if (pointer) {
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 200 && distance > 1) {
              node.vx += (dx / distance) * 0.008;
              node.vy += (dy / distance) * 0.008;
            }
          }
          node.vx += (Math.random() - 0.5) * 0.01;
          node.vy += (Math.random() - 0.5) * 0.01;
          const speed = Math.hypot(node.vx, node.vy);
          if (speed > 0.38) {
            node.vx *= 0.38 / speed;
            node.vy *= 0.38 / speed;
          }
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
          node.y = Math.max(0, Math.min(height, node.y));
        });
      }

      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;
      for (let index = 0; index < ambient.length; index += 1) {
        const first = ambient[index];
        if (!first) continue;
        for (let nextIndex = index + 1; nextIndex < ambient.length; nextIndex += 1) {
          const second = ambient[nextIndex];
          if (!second) continue;
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance < 140) {
            context.strokeStyle = `rgba(17,17,17,${((1 - distance / 140) * 0.12 * ambientAlpha).toFixed(3)})`;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }
      }
      const activePointer = pointer;
      if (activePointer) {
        ambient.forEach((node) => {
          const distance = Math.hypot(
            activePointer.x - node.x,
            activePointer.y - node.y,
          );
          if (distance < 190) {
            context.strokeStyle = `rgba(17,17,17,${((1 - distance / 190) * 0.2 * ambientAlpha).toFixed(3)})`;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(activePointer.x, activePointer.y);
            context.stroke();
          }
        });
      }
      context.fillStyle = `rgba(17,17,17,${(0.32 * ambientAlpha).toFixed(3)})`;
      ambient.forEach((node) => context.fillRect(node.x - 1, node.y - 1, 2, 2));
    };

    const ambientLoop = () => {
      ambientFrame = 0;
      drawAmbient(true);
      if (visible && mode === "ambient")
        ambientFrame = requestAnimationFrame(ambientLoop);
    };

    const startAmbient = () => {
      mode = "ambient";
      ambientAlpha = 0;
      heading.style.opacity = "1";
      if (!ambientFrame && !reducedMotion)
        ambientFrame = requestAnimationFrame(ambientLoop);
    };

    const heroElements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-hero]"),
    );
    if (!reducedMotion) {
      heroElements.slice(1).forEach((element, index) => {
        heroAnimations.push(
          element.animate(
            [
              { opacity: 0, transform: "translateY(28px)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 1100,
              delay: 2710 + index * 160,
              easing: "cubic-bezier(.16,1,.3,1)",
              fill: "backwards",
            },
          ),
        );
      });
    }

    const cleanupSkip = (skip: EventListener) => {
      skipEvents.forEach((eventName) => window.removeEventListener(eventName, skip));
    };

    const startIntro = () => {
      if (introStarted) return;
      introStarted = true;

      const sectionBounds = section.getBoundingClientRect();
      const style = getComputedStyle(heading);
      const fontSize = Number.parseFloat(style.fontSize);
      const offscreen = document.createElement("canvas");
      offscreen.width = Math.ceil(width);
      offscreen.height = Math.ceil(height);
      const offscreenContext = offscreen.getContext("2d", { willReadFrequently: true });
      const textNode = heading.firstChild;
      if (!offscreenContext || !textNode) {
        startAmbient();
        return;
      }

      offscreenContext.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
      offscreenContext.textBaseline = "alphabetic";
      offscreenContext.fillStyle = "#000";
      const metrics = offscreenContext.measureText("Hg");
      const ascent = metrics.fontBoundingBoxAscent || fontSize * 0.8;
      const descent = metrics.fontBoundingBoxDescent || fontSize * 0.22;
      const groups: { word: string; x: number; y: number; bounds: DOMRect }[][] = [
        [],
        [],
        [],
      ];
      const expression = /\S+/g;
      let match: RegExpExecArray | null;
      let wordIndex = 0;
      while ((match = expression.exec(title))) {
        const range = document.createRange();
        range.setStart(textNode, match.index);
        range.setEnd(textNode, match.index + match[0].length);
        const bounds = range.getClientRects()[0];
        if (bounds) {
          const group = wordIndex === 0 ? 0 : wordIndex < 3 ? 1 : 2;
          groups[group]?.push({
            word: match[0],
            x: bounds.left - sectionBounds.left,
            y:
              bounds.top -
              sectionBounds.top +
              (bounds.height - (ascent + descent)) / 2 +
              ascent,
            bounds,
          });
        }
        wordIndex += 1;
      }

      const sampleStep = fontSize > 90 ? 5 : fontSize > 60 ? 4 : 3;
      let targets: TargetPoint[] = [];
      groups.forEach((words, group) => {
        if (!words.length) return;
        offscreenContext.clearRect(0, 0, offscreen.width, offscreen.height);
        words.forEach((word) => offscreenContext.fillText(word.word, word.x, word.y));
        const left = Math.max(
          0,
          Math.floor(
            Math.min(...words.map((word) => word.bounds.left - sectionBounds.left - 8)),
          ),
        );
        const top = Math.max(
          0,
          Math.floor(
            Math.min(...words.map((word) => word.bounds.top - sectionBounds.top - 8)),
          ),
        );
        const right = Math.min(
          offscreen.width,
          Math.ceil(
            Math.max(
              ...words.map((word) => word.bounds.right - sectionBounds.left + 8),
            ),
          ),
        );
        const bottom = Math.min(
          offscreen.height,
          Math.ceil(
            Math.max(
              ...words.map((word) => word.bounds.bottom - sectionBounds.top + 8),
            ),
          ),
        );
        if (right <= left || bottom <= top) return;
        const sampleWidth = right - left;
        const pixels = offscreenContext.getImageData(
          left,
          top,
          sampleWidth,
          bottom - top,
        ).data;
        for (let y = 0; y < bottom - top; y += sampleStep) {
          for (let x = 0; x < sampleWidth; x += sampleStep) {
            if ((pixels[(y * sampleWidth + x) * 4 + 3] ?? 0) > 128) {
              targets.push({ tx: left + x, ty: top + y, group });
            }
          }
        }
      });

      if (!targets.length) {
        startAmbient();
        return;
      }
      for (let index = targets.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [targets[index], targets[randomIndex]] = [
          targets[randomIndex]!,
          targets[index]!,
        ];
      }
      targets = targets.slice(0, width < 700 ? 650 : 1400);
      const randomCurve = () =>
        (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
      const humanCenter = { x: width * 0.15, y: height * 0.42 };
      const systemCenter = { x: width * 0.85, y: height * 0.54 };
      const particles: Particle[] = targets.map((target) => {
        const human = Math.random() < 0.36;
        const center = human ? humanCenter : systemCenter;
        const sx = center.x + randomCurve() * (human ? width * 0.13 : width * 0.09);
        const sy = center.y + randomCurve() * (human ? height * 0.3 : height * 0.2);
        return {
          ...target,
          human,
          sx,
          sy,
          mx: width * 0.5 + randomCurve() * width * 0.1,
          my: height * 0.48 + randomCurve() * height * 0.14,
          phase: Math.random() * Math.PI * 2,
          delay: target.group * 170 + Math.random() * 160,
          x: sx,
          y: sy,
          progress: 0,
        };
      });

      mode = "intro";
      const start = performance.now();
      const duration = 1700;
      const end = 3150;
      const ease = (value: number) =>
        value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

      const finish = () => {
        if (mode !== "intro") return;
        cancelAnimationFrame(introFrame);
        cleanupSkip(skip);
        startAmbient();
      };
      const skip: EventListener = (event) => {
        if (
          event.type === "pointerdown" &&
          event.target instanceof Element &&
          event.target.closest("a")
        ) {
          return;
        }
        heroAnimations.forEach((animation) => animation.finish());
        finish();
      };
      skipEvents.forEach((eventName) =>
        window.addEventListener(eventName, skip, { passive: true, once: true }),
      );
      removeSkipListeners = () => cleanupSkip(skip);

      const frame = (now: number) => {
        const elapsed = now - start;
        if (elapsed >= end) {
          finish();
          return;
        }
        context.clearRect(0, 0, width, height);
        const grid = new Map<string, number[]>();
        particles.forEach((particle, index) => {
          const raw = Math.max(
            0,
            Math.min(1, (elapsed - 250 - particle.delay) / duration),
          );
          const progress = ease(raw);
          particle.progress = progress;
          const remaining = 1 - progress;
          const amplitude = remaining * 6;
          particle.x =
            remaining * remaining * particle.sx +
            2 * remaining * progress * particle.mx +
            progress * progress * particle.tx +
            Math.sin(elapsed * 0.002 + particle.phase) * amplitude;
          particle.y =
            remaining * remaining * particle.sy +
            2 * remaining * progress * particle.my +
            progress * progress * particle.ty +
            Math.cos(elapsed * 0.0023 + particle.phase) * amplitude;
          const key = `${Math.floor(particle.x / 24)},${Math.floor(particle.y / 24)}`;
          const bucket = grid.get(key) ?? [];
          bucket.push(index);
          grid.set(key, bucket);
        });

        const lineAlpha =
          Math.sin(Math.PI * Math.max(0, Math.min(1, (elapsed - 150) / 2100))) * 0.18;
        if (lineAlpha > 0.005) {
          context.strokeStyle = `rgba(17,17,17,${lineAlpha.toFixed(3)})`;
          context.lineWidth = 1;
          context.beginPath();
          particles.forEach((particle, index) => {
            let connections = 0;
            const cellX = Math.floor(particle.x / 24);
            const cellY = Math.floor(particle.y / 24);
            for (let offsetX = -1; offsetX <= 1 && connections < 2; offsetX += 1) {
              for (let offsetY = -1; offsetY <= 1 && connections < 2; offsetY += 1) {
                const bucket = grid.get(`${cellX + offsetX},${cellY + offsetY}`);
                if (!bucket) continue;
                for (const candidateIndex of bucket) {
                  if (candidateIndex <= index || connections >= 2) continue;
                  const candidate = particles[candidateIndex];
                  if (!candidate || candidate.human === particle.human) continue;
                  const dx = candidate.x - particle.x;
                  const dy = candidate.y - particle.y;
                  if (dx * dx + dy * dy < 576) {
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(candidate.x, candidate.y);
                    connections += 1;
                  }
                }
              }
            }
          });
          context.stroke();
        }

        context.globalAlpha = 1 - Math.max(0, Math.min(1, (elapsed - 2450) / 700));
        particles.forEach((particle) => {
          const shade = Math.round(150 - 133 * particle.progress);
          context.fillStyle = `rgb(${shade},${shade},${shade})`;
          context.fillRect(particle.x - 0.8, particle.y - 0.8, 1.6, 1.6);
        });
        context.globalAlpha = 1;
        heading.style.opacity = Math.max(
          0,
          Math.min(1, (elapsed - 2250) / 700),
        ).toFixed(3);
        introFrame = requestAnimationFrame(frame);
      };
      introFrame = requestAnimationFrame(frame);
    };

    const revealObserver = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const element = entry.target as HTMLElement;
              revealAnimations.push(
                element.animate(
                  [
                    { opacity: 0, transform: "translateY(24px)" },
                    { opacity: 1, transform: "none" },
                  ],
                  {
                    duration: 800,
                    easing: "cubic-bezier(.16,1,.3,1)",
                    fill: "both",
                  },
                ),
              );
              revealObserver?.unobserve(element);
            });
          },
          { rootMargin: "0px 0px -8% 0px" },
        );
    if (revealObserver) {
      root
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => revealObserver.observe(element));
    }

    const scrub = () => {
      const viewportHeight = window.innerHeight;
      root.querySelectorAll<HTMLElement>("[data-scrub]").forEach((element) => {
        if (reducedMotion) {
          element.style.color = "#f5f5f5";
          return;
        }
        const bounds = element.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (viewportHeight * 0.85 - bounds.top) / (viewportHeight * 0.4)),
        );
        const shade = Math.round(96 + (245 - 96) * progress);
        element.style.color = `rgb(${shade},${shade},${shade})`;
      });
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        scrub();
      });
    };
    const onResize = () => {
      if (mode === "ambient") {
        sizeCanvas();
        seedAmbient();
        if (reducedMotion) drawAmbient(false);
      }
      onScroll();
    };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };
    const onPointerLeave = () => {
      pointer = null;
    };

    sizeCanvas();
    seedAmbient();
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    const heroObserver = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible && mode === "ambient" && !reducedMotion && !ambientFrame) {
        ambientFrame = requestAnimationFrame(ambientLoop);
      }
    });
    heroObserver.observe(section);
    scrub();

    if (reducedMotion) {
      mode = "ambient";
      ambientAlpha = 1;
      drawAmbient(false);
    } else {
      heading.style.opacity = "0";
      const ready = document.fonts?.ready ?? Promise.resolve();
      void ready.then(startIntro);
      heroTimer = window.setTimeout(startIntro, 1500);
    }

    return () => {
      window.clearTimeout(heroTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      heroObserver.disconnect();
      revealObserver?.disconnect();
      cancelAnimationFrame(ambientFrame);
      cancelAnimationFrame(introFrame);
      cancelAnimationFrame(scrollFrame);
      heroAnimations.forEach((animation) => animation.cancel());
      revealAnimations.forEach((animation) => animation.cancel());
      removeSkipListeners();
    };
  }, [title]);

  return <canvas ref={canvasRef} className="lead-neural-canvas" aria-hidden="true" />;
}
