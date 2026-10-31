import { cn } from "@/lib/utils";

// Four little leaf sprigs tucked into a card's corners — the framing motif from
// the product-card reference. Drop inside a `relative overflow-hidden` card.

function Corner({ color, className }: { color: string; className?: string }) {
  const leaf = "M0 0 Q 9 -3 18 0 Q 9 3 0 0 Z";
  return (
    <svg viewBox="0 0 40 40" width="24" height="24" aria-hidden className={cn("absolute", className)} style={{ color }}>
      <g fill="currentColor" transform="translate(7 7)">
        <path d={leaf} transform="rotate(10)" />
        <path d={leaf} transform="rotate(80)" />
        <circle cx="-1.5" cy="-1.5" r="1.8" />
      </g>
    </svg>
  );
}

export function CornerLeaves({ color }: { color: string }) {
  return (
    <>
      <Corner color={color} className="left-2 top-2" />
      <Corner color={color} className="right-2 top-2 rotate-90" />
      <Corner color={color} className="bottom-2 right-2 rotate-180" />
      <Corner color={color} className="bottom-2 left-2 -rotate-90" />
    </>
  );
}

// a single leaf sprig, for the corner of a small tile (top-right by default)
export function CornerLeaf({ color, className }: { color: string; className?: string }) {
  return <Corner color={color} className={cn("right-1.5 top-1.5 rotate-90", className)} />;
}
