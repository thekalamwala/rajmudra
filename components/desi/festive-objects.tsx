// Small festive prop that scatters across the posters — an eight-petal marigold
// flower. Pure SVG, tint via props, no layout of its own (position it with an
// absolutely-placed wrapper).

type FlowerProps = {
  size?: number;
  color?: string;
  center?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Flower({
  size = 22,
  color = "var(--desi-marigold)",
  center = "var(--desi-orange)",
  className,
  style,
}: FlowerProps) {
  return (
    <svg viewBox="-16 -16 32 32" width={size} height={size} role="presentation" aria-hidden className={className} style={style}>
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-9.5" rx="3" ry="5.6" transform={`rotate(${i * 45})`} fill={color} />
        ))}
        <circle r="3.6" fill={center} />
      </g>
    </svg>
  );
}
