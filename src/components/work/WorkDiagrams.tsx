import { Image } from "@/components/ui/Image";
import type { ProductizeContent } from "@/lib/content/getProductize";

const assets = "/images/work/productize";

/** Text remains accessible; connector paths are the original Figma exports. */
export function EngineerDiagram({ labels }: { labels: readonly string[] }) {
  return (
    <figure
      className="engineer-diagram"
      role="img"
      aria-label="Business problems depend on a data engineer, scripts, decision logic and technical expertise to produce an outcome."
    >
      <div aria-hidden="true">
        {labels.map((label, i) => (
          <span key={label} className={`engineer-label engineer-label-${i}`}>
            {label}
          </span>
        ))}
        <Image
          className="engineer-arrow engineer-arrow-start"
          src={`${assets}/arrow-down.svg`}
          width={15}
          height={43}
          alt=""
        />
        <Image
          className="engineer-arrow engineer-arrow-middle"
          src={`${assets}/arrow-down-long.svg`}
          width={15}
          height={84}
          alt=""
        />
        <Image
          className="engineer-arrow engineer-arrow-end"
          src={`${assets}/arrow-down.svg`}
          width={15}
          height={43}
          alt=""
        />
        <Image
          className="engineer-arrow engineer-branch"
          src={`${assets}/branch-down.svg`}
          width={248}
          height={43}
          alt=""
        />
        <Image
          className="engineer-arrow engineer-return"
          src={`${assets}/branch-return.svg`}
          width={235}
          height={42}
          alt=""
        />
      </div>
    </figure>
  );
}

export function BlueprintDiagram({
  stages,
}: {
  stages: ProductizeContent["synthesis"]["stages"];
}) {
  return (
    <div
      className="blueprint-diagram"
      aria-label="Expert paths become recurring patterns and a product blueprint"
    >
      {stages.map((stage, i) => (
        <div className={`blueprint-stage blueprint-stage-${i}`} key={stage.label}>
          <p className="blueprint-label">{stage.label}</p>
          <div className="blueprint-box">
            <p className="blueprint-title">{stage.title}</p>
            <ul>
              {stage.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {i < stages.length - 1 && (
            <Image
              className="blueprint-arrow"
              src={`${assets}/arrow-next.svg`}
              alt=""
              width={15}
              height={24}
            />
          )}
        </div>
      ))}
    </div>
  );
}
