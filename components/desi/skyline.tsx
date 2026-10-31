import { cn } from "@/lib/utils";

// A stylised Indian city skyline silhouette — onion domes, minarets, a temple
// shikhara and chhatris over a run of city blocks — anchored to the bottom edge
// of whatever it sits in. Tints from a single `color` prop (defaults to ink).
// Full-bleed: scales to the container width, bottom-aligned.

const BY = 220; // baseline

// bulbous onion dome with a finial, centred on cx sitting on y=base
function dome(cx: number, base: number, w: number, h: number) {
  const fTop = base - h - h * 0.28;
  return (
    <g key={`d${cx}`}>
      <path
        d={`M ${cx - w / 2} ${base} C ${cx - w * 0.62} ${base - h * 0.5} ${cx - w * 0.3} ${base - h * 0.82} ${cx} ${base - h} C ${cx + w * 0.3} ${base - h * 0.82} ${cx + w * 0.62} ${base - h * 0.5} ${cx + w / 2} ${base} Z`}
      />
      <line x1={cx} y1={base - h} x2={cx} y2={fTop} stroke="currentColor" strokeWidth={3} />
      <circle cx={cx} cy={fTop} r={4} />
    </g>
  );
}

// slim minaret: shaft + cap dome + finial
function minaret(cx: number, base: number, h: number, w = 16) {
  return (
    <g key={`m${cx}`}>
      <rect x={cx - w / 2} y={base - h} width={w} height={h} />
      <path d={`M ${cx - w * 0.7} ${base - h} Q ${cx} ${base - h - w} ${cx + w * 0.7} ${base - h} Z`} />
      <line x1={cx} y1={base - h - w} x2={cx} y2={base - h - w - 14} stroke="currentColor" strokeWidth={2.5} />
      <circle cx={cx} cy={base - h - w - 14} r={3} />
    </g>
  );
}

// curvilinear temple shikhara (nagara tower) topped by amalaka + kalash
function shikhara(cx: number, base: number, w: number, h: number) {
  const top = base - h;
  return (
    <g key={`s${cx}`}>
      <path
        d={`M ${cx - w / 2} ${base} L ${cx - w / 2} ${base - h * 0.2} C ${cx - w * 0.34} ${base - h * 0.62} ${cx - w * 0.12} ${base - h * 0.86} ${cx} ${top + 10} C ${cx + w * 0.12} ${base - h * 0.86} ${cx + w * 0.34} ${base - h * 0.62} ${cx + w / 2} ${base - h * 0.2} L ${cx + w / 2} ${base} Z`}
      />
      {/* amalaka (ribbed disc) + kalash finial */}
      <ellipse cx={cx} cy={top + 8} rx={w * 0.22} ry={6} />
      <line x1={cx} y1={top + 4} x2={cx} y2={top - 14} stroke="currentColor" strokeWidth={3} />
      <circle cx={cx} cy={top - 16} r={4.5} />
    </g>
  );
}

// small rooftop pavilion (chhatri): 4 posts + a tiny dome
function chhatri(cx: number, base: number, w: number, h: number) {
  return (
    <g key={`c${cx}`}>
      <rect x={cx - w / 2} y={base - h} width={3} height={h} />
      <rect x={cx + w / 2 - 3} y={base - h} width={3} height={h} />
      <path d={`M ${cx - w / 2 - 3} ${base - h} Q ${cx} ${base - h - h * 0.7} ${cx + w / 2 + 3} ${base - h} Z`} />
    </g>
  );
}

function block(x: number, w: number, h: number, key: string) {
  return <rect key={key} x={x} y={BY - h} width={w} height={h} />;
}

type Props = { color?: string; className?: string; height?: number; preserve?: string };

export function Skyline({ color = "var(--desi-ink)", className, height = 150, preserve = "xMidYMax slice" }: Props) {
  return (
    <svg
      viewBox={`0 0 1440 ${BY}`}
      width="100%"
      height={height}
      preserveAspectRatio={preserve}
      role="presentation"
      aria-hidden
      className={cn("block", className)}
      style={{ color }}
      fill="currentColor"
    >
      {/* left low-rise run */}
      {block(0, 70, 86, "b1")}
      {block(64, 54, 110, "b2")}
      {block(112, 40, 72, "b3")}
      {minaret(185, BY, 150, 14)}
      {block(210, 70, 96, "b4")}
      {minaret(300, BY, 128)}

      {/* mosque / gurudwara — central dome flanked by minarets */}
      {block(330, 150, 120, "mq")}
      {dome(405, BY - 120, 120, 92)}
      {chhatri(360, BY - 120, 22, 26)}
      {chhatri(450, BY - 120, 22, 26)}

      {/* mid-rise */}
      {block(500, 58, 150, "b5")}
      {block(556, 46, 112, "b6")}
      {block(600, 64, 176, "b7")}

      {/* temple shikhara cluster */}
      {shikhara(715, BY, 118, 196)}
      {shikhara(640, BY, 60, 120)}
      {shikhara(788, BY, 48, 104)}

      {/* grand dome palace with chhatris */}
      {block(840, 230, 108, "pl")}
      {dome(955, BY - 108, 156, 118)}
      {chhatri(875, BY - 108, 26, 30)}
      {chhatri(1035, BY - 108, 26, 30)}
      {minaret(858, BY, 150, 12)}
      {minaret(1052, BY, 150, 12)}

      {/* right mid + low-rise run */}
      {block(1090, 58, 168, "b8")}
      {block(1146, 44, 120, "b9")}
      {minaret(1220, BY, 140)}
      {block(1250, 80, 100, "b10")}
      {block(1322, 60, 138, "b11")}
      {block(1378, 62, 92, "b12")}
    </svg>
  );
}
