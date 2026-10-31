import { cn } from "@/lib/utils";

// A stylised Indian city skyline silhouette — residential tower homes and Hindu
// temples (curvilinear shikharas and a stepped gopuram) over a run of city
// blocks. Anchored to the bottom edge; tints from a single `color` prop.

const BY = 220; // baseline

// plain city block
function block(x: number, w: number, h: number, key: string) {
  return <rect key={key} x={x} y={BY - h} width={w} height={h} />;
}

// residential tower home: tall shaft + rooftop box, water tank and a mast
function tower(cx: number, w: number, h: number) {
  const x = cx - w / 2;
  const top = BY - h;
  return (
    <g key={`t${cx}`}>
      <rect x={x} y={top} width={w} height={h} />
      {/* rooftop setback */}
      <rect x={cx - w * 0.22} y={top - w * 0.28} width={w * 0.44} height={w * 0.28} />
      {/* water tank on legs */}
      <rect x={cx - w * 0.16} y={top - w * 0.28 - w * 0.26} width={w * 0.32} height={w * 0.18} rx={2} />
      <rect x={cx - w * 0.14} y={top - w * 0.28 - w * 0.08} width={3} height={w * 0.08} />
      <rect x={cx + w * 0.11} y={top - w * 0.28 - w * 0.08} width={3} height={w * 0.08} />
      {/* mast */}
      <line x1={cx} y1={top - w * 0.28 - w * 0.26} x2={cx} y2={top - w * 0.28 - w * 0.26 - 14} stroke="currentColor" strokeWidth={2} />
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
      <ellipse cx={cx} cy={top + 8} rx={w * 0.2} ry={5.5} />
      <line x1={cx} y1={top + 4} x2={cx} y2={top - 14} stroke="currentColor" strokeWidth={3} />
      <circle cx={cx} cy={top - 16} r={4.5} />
    </g>
  );
}

// South-Indian gopuram: a tapering tiered tower with a barrel-vault crown and
// a row of kalash finials
function gopuram(cx: number, base: number, w: number, h: number) {
  const top = base - h;
  const wTop = w * 0.52;
  return (
    <g key={`g${cx}`}>
      {/* tapering body */}
      <path d={`M ${cx - w / 2} ${base} L ${cx - wTop / 2} ${top + 12} L ${cx + wTop / 2} ${top + 12} L ${cx + w / 2} ${base} Z`} />
      {/* tier ledges */}
      {[0.32, 0.6].map((f, i) => {
        const ww = w - (w - wTop) * f;
        const yy = base - h * f;
        return <rect key={i} x={cx - ww / 2 - 4} y={yy} width={ww + 8} height={5} />;
      })}
      {/* barrel-vault crown */}
      <path d={`M ${cx - wTop / 2 - 3} ${top + 13} Q ${cx} ${top - 12} ${cx + wTop / 2 + 3} ${top + 13} Z`} />
      {/* kalash finials */}
      {[-wTop * 0.32, 0, wTop * 0.32].map((dx, i) => (
        <g key={i}>
          <line x1={cx + dx} y1={top - 4} x2={cx + dx} y2={top - 13} stroke="currentColor" strokeWidth={2} />
          <circle cx={cx + dx} cy={top - 14} r={2.6} />
        </g>
      ))}
    </g>
  );
}

// small shrine: base block + pyramidal roof + finial
function shrine(cx: number, base: number, w: number, h: number) {
  const roof = base - h * 0.42;
  const top = base - h;
  return (
    <g key={`sh${cx}`}>
      <rect x={cx - w / 2} y={roof} width={w} height={h * 0.42} />
      <path d={`M ${cx - w / 2 - 3} ${roof} L ${cx} ${top + 6} L ${cx + w / 2 + 3} ${roof} Z`} />
      <line x1={cx} y1={top + 6} x2={cx} y2={top - 8} stroke="currentColor" strokeWidth={2.5} />
      <circle cx={cx} cy={top - 9} r={3} />
    </g>
  );
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
      {/* left tower-home cluster */}
      {block(0, 60, 80, "b1")}
      {tower(100, 70, 150)}
      {tower(185, 56, 112)}
      {block(228, 46, 70, "b2")}
      {tower(300, 76, 178)}

      {/* temple shrine + shikhara */}
      {shrine(372, BY, 54, 96)}
      {shikhara(440, BY, 96, 168)}

      {/* mid tower homes */}
      {tower(520, 60, 150)}
      {block(560, 44, 96, "b3")}
      {tower(610, 72, 196)}

      {/* central gopuram (main temple) */}
      {gopuram(715, BY, 140, 184)}

      {/* tower homes */}
      {tower(820, 64, 170)}
      {block(862, 46, 104, "b4")}
      {tower(915, 80, 206)}

      {/* shikhara cluster */}
      {shikhara(1005, BY, 80, 150)}
      {shrine(1068, BY, 48, 86)}

      {/* right tower-home run */}
      {tower(1140, 66, 182)}
      {block(1186, 44, 118, "b5")}
      {tower(1255, 84, 150)}
      {tower(1340, 60, 196)}
      {block(1392, 58, 92, "b6")}
    </svg>
  );
}
