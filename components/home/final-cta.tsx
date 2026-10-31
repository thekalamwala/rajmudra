import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { MandalaSeal, FestiveBand, Flower } from "@/components/desi";

// Full-bleed indigo poster moment — the page's loudest "bridge" to the social
// media: deep-indigo ground, halftone print texture, a big marigold corner
// mandala (static, fully visible) and scattered flowers, framed top and bottom
// by the signature festive band. (Mirrors the "It's live" poster.)
export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <FestiveBand height={22} />

      <div className="desi-indigo-panel relative px-6 py-24 md:py-28">
        {/* printed-poster dot texture */}
        <div
          aria-hidden
          className="desi-halftone pointer-events-none absolute inset-0 opacity-60"
          style={{ ["--dot" as string]: "rgba(255,255,255,0.1)" }}
        />

        {/* big marigold corner mandala — static (no spin) and fully visible in
            the bottom-right; a faint static one sits top-left */}
        <MandalaSeal
          size={300}
          color="var(--desi-marigold)"
          className="pointer-events-none absolute bottom-4 right-4 opacity-95"
        />
        <MandalaSeal
          size={200}
          color="rgba(255,255,255,0.10)"
          className="pointer-events-none absolute -left-16 -top-16"
        />

        {/* scattered marigold flowers */}
        <Flower size={30} color="var(--desi-marigold)" className="pointer-events-none absolute left-[12%] top-[22%]" />
        <Flower size={22} color="var(--desi-magenta)" center="var(--desi-marigold)" className="pointer-events-none absolute right-[16%] top-[30%]" />
        <Flower size={18} color="#ff7d1f" className="pointer-events-none absolute left-[32%] bottom-[20%]" />

        {/* copy pinned left (poster layout) so it clears the corner mandala */}
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="max-w-md">
            <RevealHeading
              as="h2"
              className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl"
            >
              One connected ecosystem for modern business operations
            </RevealHeading>
            <p className="mt-4 text-white/85">
              Replace fragmented subscriptions with focused systems for bookings,
              payments, events, communities, and customer workflows, all working
              together so your business runs with more control, clarity, and
              ownership.
            </p>
            <InPageAnchor
              href="#ecosystem"
              className="btn group mt-9 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-[var(--desi-indigo)] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] hover:bg-[var(--desi-cream)]"
            >
              Explore the Ecosystem
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </InPageAnchor>
          </div>
        </div>
      </div>

      <FestiveBand height={22} flip />
    </section>
  );
}
