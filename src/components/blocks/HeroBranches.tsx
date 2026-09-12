import { useId } from "react";

/** Both branches continue into the same stem with a shared junction color. */
export function HeroBranches() {
  const id = useId();
  const stemColor = "#A325D5";
  return (
    <svg
      className="hero-branches"
      viewBox="0 0 527.659 744.786"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-left`}
          x1="249.644"
          y1="16.786"
          x2="249.644"
          y2="320.259"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0865385" stopColor="#A1E3FF" />
          <stop offset="1" stopColor={stemColor} />
        </linearGradient>
        <linearGradient
          id={`${id}-right`}
          x1="376.245"
          y1="17.3029"
          x2="376.245"
          y2="320.259"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.5625" stopColor="#FF7373" />
          <stop offset="1" stopColor={stemColor} />
        </linearGradient>
      </defs>
      <g strokeWidth="30">
        <path
          className="hero-growing-path"
          pathLength="1"
          d="M15.0038 16.786C90.2634 37.2219 244.944 126.527 261.588 320.259L260.424 744.786"
          stroke={`url(#${id}-left)`}
          strokeLinecap="round"
        />
        <path
          className="hero-growing-path"
          pathLength="1"
          d="M512.655 15.0038C288.115 78.6107 261.588 270 261.588 320.259L260.424 744.786"
          stroke={`url(#${id}-right)`}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
