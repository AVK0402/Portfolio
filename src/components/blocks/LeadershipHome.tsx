import { Link } from "@/components/ui/Link";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { HomeContent } from "@/lib/content/getHome";
import { LeadershipMotion } from "./LeadershipMotion";

type SectionCopy = {
  eyebrow: string;
  title: string | readonly string[];
  description: string;
};

function HomeHeader() {
  return (
    <header className="lead-home-header">
      <div className="lead-home-header-inner">
        <a href="#top" className="lead-home-identity">
          <span>{siteConfig.name}</span>
          <span className="lead-home-role">Design &amp; Product Executive</span>
        </a>
        <nav className="lead-home-nav" aria-label="Primary">
          <div className="lead-home-nav-links">
            <Link href={routes.work}>Work</Link>
            <a href="#impact">Impact</a>
            <Link href={routes.values}>Leadership</Link>
            <Link href={routes.ideas}>Thinking</Link>
            <Link href={routes.about}>About</Link>
          </div>
          <Link href={routes.contact} className="lead-home-contact">
            Let&apos;s connect
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SectionHeader({ eyebrow, title, description }: SectionCopy) {
  const lines = typeof title === "string" ? [title] : title;
  return (
    <>
      <p className="lead-eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 className="lead-section-title" data-reveal>
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
      <p className="lead-section-description" data-reveal>
        {description}
      </p>
    </>
  );
}

function MetricBand({
  items,
}: {
  items: readonly { value: string; description: string }[];
}) {
  return (
    <dl className="lead-metric-band">
      {items.map((item) => (
        <div key={item.value} data-reveal>
          <dt>{item.value}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

function InsightCards({
  items,
  numbered = false,
  className = "",
}: {
  items: readonly { title: string; description: string; number?: string }[];
  numbered?: boolean;
  className?: string;
}) {
  return (
    <div className={`lead-card-grid ${className}`.trim()}>
      {items.map((item, index) => (
        <article className="lead-card" key={item.title} data-reveal>
          {numbered && (
            <p className="lead-card-number">{item.number ?? `0${index + 1}`}</p>
          )}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function CinematicSection({
  eyebrow,
  lead,
  emphasis,
  description,
  detailLabel,
  detail,
}: {
  eyebrow?: string;
  lead: string;
  emphasis: string;
  description?: string;
  detailLabel?: string;
  detail?: readonly string[];
}) {
  return (
    <section className="lead-cinematic">
      <div className="lead-cinematic-inner">
        {eyebrow && <p className="lead-cinematic-eyebrow">{eyebrow}</p>}
        <h2>
          <span>{lead}</span>
          <span data-scrub>{emphasis}</span>
        </h2>
        {description && <p className="lead-cinematic-description">{description}</p>}
        {detailLabel && detail && (
          <div className="lead-cinematic-detail">
            <p>{detailLabel}</p>
            <p>
              {detail.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SynthesisGraphic({ stages }: { stages: HomeContent["synthesis"]["stages"] }) {
  return (
    <figure className="lead-synthesis-graphic" data-reveal>
      <svg
        viewBox="0 0 900 200"
        role="img"
        aria-label="Many expert paths become recurring patterns and then a structured product blueprint."
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5" className="paths">
          <path d="M12 24C100 150 180 20 268 174" />
          <path d="M12 54C110 20 190 170 268 24" />
          <path d="M12 84C90 180 200 60 268 114" />
          <path d="M12 114C120 40 170 190 268 84" />
          <path d="M12 144C95 120 210 10 268 144" />
          <path d="M12 174C105 60 175 150 268 54" />
        </g>
        <g
          transform="translate(310)"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 45h56l22-24 36 48 22-24h100" />
          <path d="M16 100h56l22-24 36 48 22-24h100" />
          <path d="M16 155h56l22-24 36 48 22-24h100" />
        </g>
        <g transform="translate(620)" fill="currentColor">
          <rect x="20" y="20" width="240" height="34" rx="6" />
          <rect className="blocks" x="20" y="66" width="114" height="50" rx="6" />
          <rect className="blocks" x="146" y="66" width="114" height="50" rx="6" />
          <rect className="blocks" x="20" y="128" width="114" height="50" rx="6" />
          <rect className="blocks" x="146" y="128" width="114" height="50" rx="6" />
        </g>
      </svg>
      <figcaption>
        {stages.map((stage) => (
          <span key={stage.label}>
            <strong>{stage.label}</strong>
            {stage.description}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function FlowPanel({
  title,
  steps,
  inverse = false,
}: {
  title: string;
  steps: readonly string[];
  inverse?: boolean;
}) {
  return (
    <div
      className={`lead-flow-panel${inverse ? "lead-flow-panel-inverse" : ""}`}
      data-reveal
    >
      <p>{title}</p>
      <ol>
        {steps.map((step, index) => (
          <li
            className={
              step.includes("Data engineer") || step.includes("Guided") ? "is-key" : ""
            }
            key={step}
          >
            <span>{step}</span>
            {index < steps.length - 1 && <span aria-hidden="true">↓</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function LeadershipHome({ content }: { content: HomeContent }) {
  return (
    <div className="leadership-home">
      <HomeHeader />
      <main id="main-content">
        <section className="lead-hero" id="top">
          <LeadershipMotion title={content.hero.title} />
          <div className="lead-shell lead-hero-content">
            <h1 data-hero>{content.hero.title}</h1>
            <p className="lead-hero-description" data-hero>
              {content.hero.description}
            </p>
            <p className="lead-hero-actions" data-hero>
              <a href="#productize">Read the work ↓</a>
              <Link href={routes.contact}>Let&apos;s connect →</Link>
            </p>
          </div>
        </section>

        <section className="lead-portrait" aria-label="Portrait or work photograph">
          <div
            className="lead-portrait-placeholder"
            role="img"
            aria-label="Portrait or work photograph"
            data-reveal
          />
        </section>

        <section className="lead-section lead-proof" id="about">
          <div className="lead-shell">
            <MetricBand items={content.proof.metrics} />
            <p className="lead-proof-signals" data-reveal>
              {content.proof.signals.map((signal) => (
                <span key={signal.label}>
                  {"value" in signal && <strong>{signal.value}</strong>} {signal.label}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="lead-section lead-section-muted" id="productize">
          <div className="lead-shell">
            <SectionHeader {...content.productize} />
            <MetricBand items={content.productize.metrics} />
            <p className="lead-section-summary" data-reveal>
              {content.productize.summary}
            </p>
          </div>
        </section>

        <section className="lead-section">
          <div className="lead-shell">
            <SectionHeader {...content.constraint} />
            <div className="lead-horizontal-flow" data-reveal>
              {content.constraint.flow.map((step, index) => (
                <span className={step === "Data engineer" ? "is-key" : ""} key={step}>
                  {step}
                  {index < content.constraint.flow.length - 1 && (
                    <i aria-hidden="true">→</i>
                  )}
                </span>
              ))}
            </div>
            <InsightCards items={content.constraint.findings} />
          </div>
        </section>

        <section className="lead-section lead-complexity">
          <div className="lead-shell">
            <SectionHeader {...content.complexity} />
            <div className="lead-comparison-grid">
              {content.complexity.comparison.map((column) => (
                <article
                  className={column.muted ? "is-muted" : ""}
                  key={column.label}
                  data-reveal
                >
                  <p>{column.label}</p>
                  <ul>
                    {column.values.map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CinematicSection {...content.designProblem} />

        <section className="lead-section" id="leadership">
          <div className="lead-shell">
            <SectionHeader {...content.mandate} />
            <MetricBand items={content.mandate.metrics} />
            <div className="lead-principle" data-reveal>
              <p>{content.mandate.principleLabel}</p>
              <p>
                <span>{content.mandate.principleLead}</span>
                {content.mandate.principle}
              </p>
            </div>
          </div>
        </section>

        <section className="lead-section lead-section-muted">
          <div className="lead-shell">
            <SectionHeader {...content.approach} />
            <div className="lead-observed" data-reveal>
              <p>What I observed</p>
              <ul>
                {content.approach.observed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="lead-subheading" data-reveal>
              What I mapped
            </p>
            <InsightCards items={content.approach.mapped} />
          </div>
        </section>

        <CinematicSection {...content.discovery} />

        <section className="lead-section">
          <div className="lead-shell">
            <SectionHeader {...content.synthesis} />
            <SynthesisGraphic stages={content.synthesis.stages} />
            <div className="lead-principle" data-reveal>
              <p>{content.synthesis.principleLabel}</p>
              <p>{content.synthesis.principle}</p>
            </div>
          </div>
        </section>

        <CinematicSection {...content.productization} />

        <section className="lead-section" id="impact">
          <div className="lead-shell">
            <SectionHeader {...content.impact} />
            <div className="lead-flow-grid">
              <FlowPanel title="Before" steps={content.impact.before} />
              <FlowPanel title="After" steps={content.impact.after} inverse />
            </div>
            <InsightCards items={content.impact.outcomes} />
            <blockquote data-reveal>{content.impact.quote}</blockquote>
          </div>
        </section>

        <CinematicSection {...content.result} />

        <section className="lead-section" id="future">
          <div className="lead-shell">
            <SectionHeader {...content.validation} />
            <InsightCards items={content.validation.stages} numbered />
            <div className="lead-duration" data-reveal>
              <strong>{content.validation.duration}</strong>
              <span>{content.validation.durationLabel}</span>
            </div>
            <p className="lead-subheading" data-reveal>
              {content.validation.changesLabel}
            </p>
            <InsightCards
              items={content.validation.changes}
              className="lead-card-grid-four"
            />
            <div className="lead-principle" data-reveal>
              <p>{content.validation.principleLabel}</p>
              <p>{content.validation.principle}</p>
            </div>
          </div>
        </section>

        <section className="lead-section lead-section-muted">
          <div className="lead-shell">
            <SectionHeader {...content.businessShift} />
            <InsightCards
              items={content.businessShift.progression}
              numbered
              className="lead-card-grid-four lead-progression"
            />
            <p className="lead-subheading" data-reveal>
              {content.businessShift.unlockedLabel}
            </p>
            <InsightCards items={content.businessShift.unlocked} />
          </div>
        </section>

        <CinematicSection {...content.close} />
      </main>
      <footer className="lead-home-footer">{siteConfig.name}</footer>
    </div>
  );
}
