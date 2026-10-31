import { useId } from "react";

// A festive sun: triangular rays radiating from a solid core, the recurring
// motif of the Desi Digital posters. Pure SVG so it stays crisp at any size and
// tints from CSS variables. Optional slow spin on the rays only.

type Props = {
  size?: number | string;
  rays?: number;
  /** ray colour */
  color?: string;
  /** core disc colour; omit for no core */
  core?: string | null;
  /** fraction of the radius the core fills (0–1) */
  coreScale?: number;
  /** fraction of radius where rays start (0–1) */
  rayStart?: number;
  /** gap between rays as a fraction of each slot (0–1) */
  gap?: number;
  spin?: boolean | "rev";
  className?: string;
  style?: React.CSSProperties;
};

export function Sunburst({
  size = 240,
  rays = 24,
  color = "var(--desi-marigold)",
  core = "var(--desi-orange)",
  coreScale = 0.42,
  rayStart = 0.5,
  gap = 0.4,
  spin,
  className,
  style,
}: Props) {
  const id = useId().replace(/:/g, "");
  const R = 100;
  const r0 = R * rayStart;
  const half = ((1 - gap) * Math.PI) / rays; // half-angular width of a ray
  const wedges = Array.from({ length: rays }, (_, i) => {
    const a = (i / rays) * Math.PI * 2 - Math.PI / 2;
    const p = (ang: number, rad: number) => `${(Math.cos(ang) * rad).toFixed(2)},${(Math.sin(ang) * rad).toFixed(2)}`;
    return `M ${p(a - half, r0)} L ${p(a - half, R)} L ${p(a + half, R)} L ${p(a + half, r0)} Z`;
  });
  const spinClass = spin === "rev" ? "desi-spin-rev" : spin ? "desi-spin-slow" : "";

  return (
    <svg
      viewBox="-110 -110 220 220"
      width={size}
      height={size}
      role="presentation"
      aria-hidden
      className={className}
      style={style}
    >
      <g className={spinClass} key={id}>
        {wedges.map((d, i) => (
          <path key={i} d={d} fill={color} />
        ))}
      </g>
      {core != null && <circle r={R * coreScale} fill={core} />}
    </svg>
  );
}
