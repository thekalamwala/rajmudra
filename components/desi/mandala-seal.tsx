import { useId } from "react";

// The Rajmudra Seal rendered as a tintable, scalable React SVG — the scalloped
// octagon with a bead ring and an open centre (the centre is a cut-out, so the
// background shows through). Geometry matches the official mark exactly. Used as
// a decorative mandala throughout the Desi Digital look.

const OUTER_BEADS: [number, number][] = [
  [157.4, -380], [213.05, -324.35], [268.7, -268.7], [324.35, -213.05],
  [380, -157.4], [380, -78.7], [380, 0], [380, 78.7], [380, 157.4],
  [324.35, 213.05], [268.7, 268.7], [213.05, 324.35], [157.4, 380],
  [78.7, 380], [0, 380], [-78.7, 380], [-157.4, 380], [-213.05, 324.35],
  [-268.7, 268.7], [-324.35, 213.05], [-380, 157.4], [-380, 78.7], [-380, 0],
  [-380, -78.7], [-380, -157.4], [-324.35, -213.05], [-268.7, -268.7],
  [-213.05, -324.35], [-157.4, -380], [-78.7, -380], [0, -380], [78.7, -380],
];

const INNER_BEADS: [number, number][] = [
  [113.91, -275], [154.18, -234.73], [194.45, -194.45], [234.73, -154.18],
  [275, -113.91], [275, -56.95], [275, 0], [275, 56.95], [275, 113.91],
  [234.73, 154.18], [194.45, 194.45], [154.18, 234.73], [113.91, 275],
  [56.95, 275], [0, 275], [-56.95, 275], [-113.91, 275], [-154.18, 234.73],
  [-194.45, 194.45], [-234.73, 154.18], [-275, 113.91], [-275, 56.95],
  [-275, 0], [-275, -56.95], [-275, -113.91], [-234.73, -154.18],
  [-194.45, -194.45], [-154.18, -234.73], [-113.91, -275], [-56.95, -275],
  [0, -275], [56.95, -275],
];

const OCTAGON = "132.55,-320 320,-132.55 320,132.55 132.55,320 -132.55,320 -320,132.55 -320,-132.55 -132.55,-320";

type Props = {
  size?: number | string;
  color?: string;
  className?: string;
  /** slow continuous rotation */
  spin?: boolean | "rev" | "slow";
  style?: React.CSSProperties;
};

export function MandalaSeal({ size = 160, color = "var(--desi-orange)", className, spin, style }: Props) {
  const id = useId().replace(/:/g, "");
  const spinClass =
    spin === "rev" ? "desi-spin-rev" : spin === "slow" || spin === true ? "desi-spin-slower" : "";

  return (
    <svg
      viewBox="-445 -445 890 890"
      width={size}
      height={size}
      role="presentation"
      aria-hidden
      className={className}
      style={style}
    >
      <mask id={`ms-${id}`} maskUnits="userSpaceOnUse" x="-445" y="-445" width="890" height="890">
        <polygon
          points="157.4,-380 380,-157.4 380,157.4 157.4,380 -157.4,380 -380,157.4 -380,-157.4 -157.4,-380"
          fill="#fff"
        />
        {OUTER_BEADS.map(([x, y], i) => (
          <circle key={`o${i}`} cx={x} cy={y} r={46} fill="#fff" />
        ))}
        <polygon points={OCTAGON} fill="none" stroke="#000" strokeWidth={12} strokeLinejoin="round" />
        {INNER_BEADS.map(([x, y], i) => (
          <circle key={`i${i}`} cx={x} cy={y} r={14} fill="#000" />
        ))}
        <circle r={165} fill="#000" />
      </mask>
      <g className={spinClass}>
        <rect x="-445" y="-445" width="890" height="890" fill={color} mask={`url(#ms-${id})`} />
      </g>
    </svg>
  );
}
