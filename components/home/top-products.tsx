"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { featuredProducts, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { Toran } from "@/components/desi";

// The four headline products shown on the homepage. Picked by slug so
// re-ordering lib/products.ts can never shuffle this grid.
const TOP_SLUGS = ["alluminaty", "meeticulous", "coffee-for-me", "ticket-dino"];

const topProducts = TOP_SLUGS.map((slug) =>
  featuredProducts.find((p) => p.slug === slug),
).filter((p): p is Product => Boolean(p));

// Product shot shown while a tile is collapsed (its narrow state), from the
// same artwork the case studies use (lib/case-studies-products.ts).
const PRODUCT_IMAGE: Record<string, { src: string; alt: string }> = {
  alluminaty: { src: "/portfolio/alluminaty2.png", alt: "Alluminaty alumni management app" },
  "meeticulous": { src: "/portfolio/meeticulous2.png", alt: "Meeticulous booking app" },
  "coffee-for-me": { src: "/portfolio/coffee-toffee.png", alt: "Coffee and Toffee creator support" },
  "ticket-dino": { src: "/portfolio/ticket-dino.png", alt: "Ticket Dino event ticketing" },
};

// Two products per row, same height as each other but different widths. The
// wide tile zig-zags: the first row opens on its left tile, the second on its
// right (the 4th product). Clicking a tile widens it and reveals its copy.
const rows = [topProducts.slice(0, 2), topProducts.slice(2, 4)];

function ProductTile({
  product,
  index,
  expanded,
  onExpand,
}: {
  product: Product;
  index: number;
  expanded: boolean;
  onExpand: () => void;
}) {
  const { name, tagline, features, icon: Icon, accent, href } = product;
  const image = PRODUCT_IMAGE[product.slug];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={onExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
      style={{ flexGrow: expanded ? 2.35 : 1, borderColor: accent }}
      className={cn(
        "group/tile relative flex h-[42rem] min-w-0 cursor-pointer flex-col overflow-hidden rounded-[20px] border-2 bg-card p-6 pb-8 text-left transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:h-[34rem] md:basis-0 md:p-7 md:pb-8",
        expanded
          ? "shadow-[0_30px_70px_-40px_rgba(23,23,23,0.5)]"
          : "hover:-translate-y-1 hover:shadow-[0_24px_50px_-42px_rgba(23,23,23,0.55)]",
      )}
    >
      {/* festive dressing: tiny-dot garland on top, dotted line at the base */}
      {expanded ? <Toran color={accent} height={22} className="absolute inset-x-0 top-0" /> : null}
      <div className="pointer-events-none absolute inset-x-6 bottom-4 border-t-2 border-dotted" style={{ borderColor: accent }} />
      {/* accent bloom */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-52 rounded-full blur-3xl transition-opacity duration-500",
          expanded ? "opacity-100" : "opacity-0",
        )}
        style={{ backgroundColor: `${accent}26` }}
      />

      {/* oversized ghost glyph, fills the tile in either state */}
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-6 size-44 -rotate-6 transition-transform duration-500 ease-out group-hover/tile:scale-105"
        style={{ color: `${accent}14` }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover/tile:scale-105"
          style={{
            backgroundColor: `${accent}1f`,
            color: accent,
            boxShadow: `inset 0 0 0 1px ${accent}33`,
          }}
        >
          <Icon className="size-6" />
        </span>

        <span className="grid size-9 place-items-center rounded-full border border-ink/10 bg-background/60 text-ink/70 backdrop-blur transition-colors duration-300 group-hover/tile:border-ink/25 group-hover/tile:text-ink">
          <Plus
            className={cn("size-4 transition-transform duration-500", expanded && "rotate-45")}
          />
        </span>
      </div>

      <div className="relative mt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="mt-2 flex items-center gap-1.5">
          <h3 className="font-display text-2xl font-black tracking-tight text-foreground">{name}</h3>
          <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5" />
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">{tagline}</p>

        {/* information — six blocks, revealed on the widened tile */}
        <div
          className={cn(
            "grid transition-all duration-500 ease-out",
            expanded ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border/70 pt-4">
              {features?.length ? (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {features.map((f) => {
                    const FeatureIcon = f.icon;
                    return (
                      <div
                        key={f.title}
                        className="rounded-xl border border-border/70 bg-secondary/40 p-3"
                      >
                        <span
                          className="grid size-8 place-items-center rounded-lg"
                          style={{ backgroundColor: `${accent}1f`, color: accent }}
                        >
                          <FeatureIcon className="size-4" weight="bold" />
                        </span>
                        <p className="mt-2.5 text-xs font-bold leading-tight text-foreground">
                          {f.title}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-foreground/60">
                          {f.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <Link
                href={href}
                onClick={(e) => e.stopPropagation()}
                className="group/cta mt-5 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                View product
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* product shot — sits below the copy, fills the tile while it is narrow */}
      {image ? (
        <div
          className={cn(
            "relative grid transition-all duration-500 ease-out",
            expanded
              ? "grid-rows-[0fr] opacity-0"
              : "mt-5 min-h-[8.5rem] flex-1 grid-rows-[1fr] opacity-100",
          )}
        >
          <div className="overflow-hidden">
            <div className="relative h-full min-h-[8.5rem] w-full overflow-hidden rounded-xl border border-border/70 bg-secondary/40">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TopProducts() {
  // Per row, the index of the widened tile. Defaults put products 1 and 4 wide.
  const [expanded, setExpanded] = useState<number[]>([0, 1]);

  // Click a collapsed tile to open it; click the open tile (its X) to close the
  // whole row back to even-width tiles (-1 = none expanded).
  const expand = (row: number, index: number) =>
    setExpanded((prev) => {
      const next = [...prev];
      next[row] = prev[row] === index ? -1 : index;
      return next;
    });

  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <RevealHeading
            as="h2"
            className="font-display max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl"
          >
            Software we designed, built and run.
          </RevealHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Four products from the Rajmudra ecosystem. Open a tile to see what it does.
          </p>
        </div>
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-1.5 text-sm font-bold text-foreground"
        >
          All products
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <Reveal stagger className="mt-8 space-y-4 md:mt-10">
        {rows.map((row, r) => (
          <div key={r} className="flex flex-col gap-4 md:flex-row">
            {row.map((product, i) => (
              <ProductTile
                key={product.slug}
                product={product}
                index={r * 2 + i}
                expanded={expanded[r] === i}
                onExpand={() => expand(r, i)}
              />
            ))}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
