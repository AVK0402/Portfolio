import { Image } from "@/components/ui/Image";
import type { HomeContent } from "@/lib/content/getHome";

/** Exact exported Figma geometry, scaled together inside a responsive aspect ratio. */
export function SystemDiagram({
  content,
}: {
  content: HomeContent["featured"]["diagram"];
}) {
  return (
    <figure
      className="system-diagram"
      role="img"
      aria-label={`${content.labels.join(", ")} — ${content.center}`}
    >
      <div aria-hidden="true" className="system-diagram-canvas">
        {content.labels.map((label, index) => (
          <div key={label} className={`system-endpoint system-endpoint-${index + 1}`}>
            <span>{label}</span>
            <Image src="/images/home/system-dot.svg" width={17} height={17} alt="" />
          </div>
        ))}
        <Image
          className="system-connector system-connector-left"
          src="/images/home/system-left.svg"
          width={266}
          height={300}
          alt=""
        />
        <Image
          className="system-connector system-connector-center"
          src="/images/home/system-stem.svg"
          width={1}
          height={235}
          alt=""
        />
        <Image
          className="system-connector system-connector-right"
          src="/images/home/system-right.svg"
          width={279}
          height={302}
          alt=""
        />
        <div className="system-center">
          <Image
            className="system-ring"
            src="/images/home/system-ring.svg"
            width={233}
            height={233}
            alt=""
          />
          <Image
            className="system-core"
            src="/images/home/system-core.png"
            width={169}
            height={169}
            alt=""
            unoptimized
          />
          <span>{content.center}</span>
        </div>
      </div>
    </figure>
  );
}
