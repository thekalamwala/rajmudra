import { useId } from "react";
import { cn } from "@/lib/utils";

// Warli folk-art motifs — stick-figure dancers, a village hut and tree, and the
// triangle border — for the footer. Simple geometric tribal forms; tint via
// `color`.

const DEF = "#b0531f"; // warm warli brown-orange

// a single warli figure: round head, two triangles (hourglass) torso, stick limbs
function figure(x: number, y: number, c: string, pose: "dance" | "dholL" | "pot") {
  const feet = y;
  const hipY = y - 8;
  const waistY = y - 18;
  const shY = y - 28;
  const headY = y - 32;
  const limbs = (
    <g stroke={c} strokeWidth={2} strokeLinecap="round" fill="none">
      <line x1={x - 2.5} y1={hipY} x2={x - 6} y2={feet} />
      <line x1={x + 2.5} y1={hipY} x2={x + 6} y2={feet} />
      {pose === "dance" && (
        <>
          <line x1={x - 4} y1={shY + 2} x2={x - 12} y2={shY - 7} />
          <line x1={x + 4} y1={shY + 2} x2={x + 12} y2={shY - 7} />
        </>
      )}
      {pose === "dholL" && (
        <>
          <line x1={x - 4} y1={shY + 2} x2={x - 13} y2={waistY} />
          <line x1={x + 4} y1={shY + 2} x2={x + 13} y2={waistY} />
        </>
      )}
      {pose === "pot" && (
        <>
          <line x1={x - 4} y1={shY + 2} x2={x - 2} y2={headY - 2} />
          <line x1={x + 4} y1={shY + 2} x2={x + 11} y2={shY + 10} />
        </>
      )}
    </g>
  );
  return (
    <g key={`${x}-${pose}`}>
      <circle cx={x} cy={headY} r={3.4} fill={c} />
      <path d={`M ${x - 5} ${shY} L ${x + 5} ${shY} L ${x} ${waistY} Z`} fill={c} />
      <path d={`M ${x} ${waistY} L ${x - 5} ${hipY} L ${x + 5} ${hipY} Z`} fill={c} />
      {limbs}
      {pose === "dholL" && <ellipse cx={x - 15} cy={waistY + 1} rx={4.5} ry={7} fill="none" stroke={c} strokeWidth={2} />}
      {pose === "pot" && (
        <>
          <ellipse cx={x} cy={headY - 6} rx={5} ry={4} fill={c} />
          <rect x={x - 3} y={headY - 9} width={6} height={2} fill={c} />
        </>
      )}
    </g>
  );
}

// a thatched hut: square body, triangle roof, little door
function hut(x: number, y: number, c: string) {
  const w = 30;
  const h = 22;
  return (
    <g key={`hut${x}`}>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="none" stroke={c} strokeWidth={2} />
      <path d={`M ${x - w / 2 - 5} ${y - h} L ${x} ${y - h - 14} L ${x + w / 2 + 5} ${y - h} Z`} fill={c} />
      <rect x={x - 4} y={y - 11} width={8} height={11} fill={c} />
    </g>
  );
}

// a warli tree: trunk with radiating branches and dot leaves
function tree(x: number, y: number, c: string, h = 46) {
  const top = y - h;
  const branches = Array.from({ length: 5 }).map((_, i) => {
    const ty = y - 14 - i * (h - 14) / 5;
    const dir = i % 2 === 0 ? 1 : -1;
    const len = 9 - i * 0.8;
    return <line key={i} x1={x} y1={ty} x2={x + dir * len} y2={ty - 7} stroke={c} strokeWidth={1.6} strokeLinecap="round" />;
  });
  return (
    <g key={`tree${x}`}>
      <line x1={x} y1={y} x2={x} y2={top} stroke={c} strokeWidth={2} strokeLinecap="round" />
      {branches}
      <circle cx={x} cy={top} r={2.4} fill={c} />
    </g>
  );
}

export function WarliDancers({ color = DEF, className, height = 64 }: { color?: string; className?: string; height?: number }) {
  return (
    <svg viewBox="0 0 120 70" width={(120 / 70) * height} height={height} aria-hidden className={cn("block", className)}>
      {figure(28, 66, color, "dholL")}
      {figure(72, 66, color, "dance")}
      {figure(104, 66, color, "dance")}
      {/* ground tufts */}
      <path d="M2 66 q 4 -8 8 0 M10 66 q 4 -8 8 0" fill="none" stroke={color} strokeWidth={1.4} />
    </svg>
  );
}

export function WarliVillage({ color = DEF, className, height = 72 }: { color?: string; className?: string; height?: number }) {
  return (
    <svg viewBox="0 0 220 80" width={(220 / 80) * height} height={height} aria-hidden className={cn("block", className)}>
      {figure(30, 76, color, "pot")}
      {hut(110, 76, color)}
      {tree(185, 76, color, 54)}
      {tree(208, 76, color, 40)}
      <path d="M150 76 q 5 -9 10 0 M162 76 q 5 -9 10 0" fill="none" stroke={color} strokeWidth={1.4} />
    </svg>
  );
}

// repeating warli triangle border band
export function WarliBorder({ color = DEF, className, height = 16 }: { color?: string; className?: string; height?: number }) {
  const id = useId().replace(/:/g, "");
  const U = 22;
  return (
    <div aria-hidden className={cn("w-full overflow-hidden leading-[0]", className)} style={{ height, color }}>
      <svg width="100%" height={height} role="presentation">
        <defs>
          <pattern id={`wb-${id}`} width={U} height={height} patternUnits="userSpaceOnUse">
            <path d={`M0 ${height - 2} L${U / 4} 3 L${U / 2} ${height - 2} Z`} fill="currentColor" />
            <path d={`M${U / 2} ${height - 2} L${(U * 3) / 4} 3 L${U} ${height - 2} Z`} fill="none" stroke="currentColor" strokeWidth={1.4} />
            <circle cx={U / 4} cy={height - 1} r={1} fill="currentColor" />
            <circle cx={(U * 3) / 4} cy={height - 1} r={1} fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#wb-${id})`} />
      </svg>
    </div>
  );
}
