import { cn } from "@/lib/utils";

// An Indian hill-fort gate (Maratha / Rajput style): round bastions with chhatri
// pavilions, a tall arched maha-darwaza, battlemented ramparts and fluttering
// saffron flags — painted like a Rajasthani / truck-art fort: each mass takes a
// different jewel tone (orange ramparts, teal side bastions, indigo gate towers,
// a rani-magenta gateway), all unified by marigold-gold crenellations and trim,
// with cream chhatri domes. Multi-colour and loud, to match the brand posters.

const BY = 220; // baseline

// shared trims
const GOLD = "#ffc01e"; // crenellations, bands, string-courses, finials
const OPEN = "#15102e"; // deep-indigo openings / gate interior
const HILL = "#43142e"; // deep berry mound
const DOME = "#fbf4e6"; // cream chhatri dome
const DOME_HI = "#ffffff"; // lit dome
const FINIAL = "#ff2d8f"; // magenta finial bead
const FLAG = "#ff7d1f"; // saffron pennant
const POLE = "#4a2f1a"; // flag pole

// a tone = four shades of one jewel colour (lit face → body → shadow band)
type Tone = { body: string; face: string; hi: string; band: string };
const ORANGE: Tone = { body: "#fe5100", face: "#ff7a3d", hi: "#ffa06e", band: "#c23c00" };
const TEAL: Tone = { body: "#0e9384", face: "#23b2a2", hi: "#5fd0c4", band: "#0a6157" };
const INDIGO: Tone = { body: "#312678", face: "#4a3ca0", hi: "#6b5cc6", band: "#1c1548" };
const MAGENTA: Tone = { body: "#c21e63", face: "#e0407f", hi: "#f27ba8", band: "#8c1448" };

type Node = React.ReactNode;

function merlons(x1: number, x2: number, topY: number, fill: string, mw = 11, gap = 8, mh = 10) {
  const out: Node[] = [];
  let x = x1;
  let i = 0;
  while (x + mw <= x2) {
    out.push(<rect key={`${x1}-${topY}-${i}`} x={x} y={topY - mh} width={mw} height={mh} fill={fill} />);
    x += mw + gap;
    i++;
  }
  return out;
}

function pointedArch(cx: number, aw: number, baseY: number, springY: number, topY: number) {
  return `M ${cx - aw / 2} ${baseY} L ${cx - aw / 2} ${springY} Q ${cx - aw / 2} ${topY} ${cx} ${topY} Q ${cx + aw / 2} ${topY} ${cx + aw / 2} ${springY} L ${cx + aw / 2} ${baseY} Z`;
}

function rampart(x1: number, x2: number, h: number, t: Tone, key: string) {
  const top = BY - h;
  return (
    <g key={key}>
      <rect x={x1} y={top} width={x2 - x1} height={h} fill={t.body} />
      <rect x={x1} y={top + 3} width={x2 - x1} height={4} fill={GOLD} />
      {merlons(x1 + 3, x2 - 3, top, GOLD)}
      {/* arrow slits */}
      {[0.28, 0.5, 0.72].map((f, i) => (
        <rect key={i} x={x1 + (x2 - x1) * f} y={top + 16} width={3} height={14} fill={OPEN} />
      ))}
    </g>
  );
}

function chhatri(cx: number, baseY: number, w: number, col: string) {
  const ph = w * 0.46;
  const platY = baseY - 4;
  const colTop = platY - ph;
  const domeH = w * 0.5;
  return (
    <g>
      <rect x={cx - w / 2} y={platY} width={w} height={4} fill={GOLD} />
      <rect x={cx - w / 2} y={colTop} width={3} height={ph} fill={col} />
      <rect x={cx + w / 2 - 3} y={colTop} width={3} height={ph} fill={col} />
      <path d={`M ${cx - w / 2 - 2} ${colTop} Q ${cx} ${colTop - domeH} ${cx + w / 2 + 2} ${colTop} Z`} fill={DOME} />
      <path d={`M ${cx - w / 2 - 2} ${colTop} Q ${cx - w * 0.2} ${colTop - domeH * 0.9} ${cx} ${colTop - domeH} L ${cx} ${colTop} Z`} fill={DOME_HI} />
      <rect x={cx - 1} y={colTop - domeH - 7} width={2} height={7} fill={GOLD} />
      <circle cx={cx} cy={colTop - domeH - 8} r={2.4} fill={FINIAL} />
    </g>
  );
}

function flag(cx: number, topY: number, key: string, h = 24, d = 0) {
  return (
    <g key={key}>
      <rect x={cx - 1} y={topY - h} width={2.4} height={h} fill={POLE} />
      <g className="desi-flag" style={{ ["--d" as string]: `${d}s` }}>
        <path d={`M ${cx + 1.2} ${topY - h} L ${cx + 19} ${topY - h + 6} L ${cx + 1.2} ${topY - h + 13} Z`} fill={FLAG} />
      </g>
    </g>
  );
}

// cylindrical bastion with round shading, battlement ring and a chhatri on top
function bastion(cx: number, w: number, h: number, t: Tone, key: string, withChhatri = true) {
  const top = BY - h;
  const x = cx - w / 2;
  return (
    <g key={key}>
      <rect x={x} y={top} width={w} height={h} fill={t.body} />
      <rect x={x} y={top} width={w * 0.3} height={h} fill={t.face} />
      <rect x={x} y={top} width={w * 0.1} height={h} fill={t.hi} />
      <rect x={cx + w * 0.26} y={top} width={w * 0.24} height={h} fill={t.band} />
      {/* battlement ring */}
      <rect x={x - 2} y={top + 10} width={w + 4} height={6} fill={GOLD} />
      {merlons(x, x + w, top, GOLD, 10, 7, 9)}
      {/* arrow slits */}
      <rect x={cx - w * 0.22} y={top + 34} width={3} height={16} fill={OPEN} />
      <rect x={cx + w * 0.18} y={top + 34} width={3} height={16} fill={OPEN} />
      {withChhatri && chhatri(cx, top + 2, w * 0.5, t.band)}
    </g>
  );
}

function gateway(cx: number, t: Tone, key: string) {
  const w = 150;
  const h = 176;
  const x = cx - w / 2;
  const top = BY - h;
  return (
    <g key={key}>
      <rect x={x} y={top} width={w} height={h} fill={t.body} />
      <rect x={x} y={top} width={w * 0.16} height={h} fill={t.face} />
      <rect x={x + w - w * 0.12} y={top} width={w * 0.12} height={h} fill={t.band} />
      {/* string courses */}
      <rect x={x} y={top + 34} width={w} height={5} fill={GOLD} />
      <rect x={x} y={top} width={w} height={5} fill={GOLD} />
      {merlons(x + 3, x + w - 3, top, GOLD, 12, 9, 11)}
      {/* big arched gateway opening */}
      <path d={pointedArch(cx, 78, BY, BY - 84, BY - 136)} fill={OPEN} />
      {/* golden arch trim */}
      <path d={pointedArch(cx, 78, BY, BY - 84, BY - 136)} fill="none" stroke={GOLD} strokeWidth={4} />
      {/* small arched window above the gate */}
      <path d={pointedArch(cx, 30, top + 74, top + 58, top + 40)} fill={OPEN} />
      {/* two small flanking windows */}
      <rect x={cx - 48} y={top + 58} width={8} height={18} rx={3} fill={OPEN} />
      <rect x={cx + 40} y={top + 58} width={8} height={18} rx={3} fill={OPEN} />
    </g>
  );
}

type Props = { color?: string; className?: string; height?: number; preserve?: string };

export function Fort({ className, height = 172, preserve = "xMidYMax slice" }: Props) {
  return (
    <svg
      viewBox={`0 0 1440 ${BY}`}
      width="100%"
      height={height}
      preserveAspectRatio={preserve}
      role="presentation"
      aria-hidden
      className={cn("block", className)}
    >
      {/* hillock */}
      <path d={`M0 ${BY} L0 ${BY - 12} Q 360 ${BY - 34} 720 ${BY - 42} Q 1080 ${BY - 34} 1440 ${BY - 12} L1440 ${BY} Z`} fill={HILL} />

      {/* outer + side ramparts (orange walls, teal side bastions) */}
      {rampart(30, 150, 58, ORANGE, "ow-l")}
      {rampart(150, 540, 92, ORANGE, "rw-l")}
      {bastion(300, 84, 122, TEAL, "sb-l")}
      {flag(300, BY - 122, "sf-l", 20, 0.6)}

      {rampart(900, 1290, 92, ORANGE, "rw-r")}
      {bastion(1140, 84, 122, TEAL, "sb-r")}
      {flag(1140, BY - 122, "sf-r", 20, 1.1)}
      {rampart(1290, 1410, 58, ORANGE, "ow-r")}

      {/* central maha darwaza: magenta gateway framed by two indigo bastions */}
      {gateway(720, MAGENTA, "gate")}
      {bastion(604, 112, 150, INDIGO, "gb-l")}
      {bastion(836, 112, 150, INDIGO, "gb-r")}

      {/* flags over the citadel (the tall central flag is drawn in the hero so
          it isn't cropped by this bottom-anchored viewBox) */}
      {flag(604, BY - 150, "gf-l", 26, 0)}
      {flag(836, BY - 150, "gf-r", 26, 0.9)}
    </svg>
  );
}
