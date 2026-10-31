import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { Sunburst, Skyline, RangoliDivider } from "@/components/desi";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl px-8 py-20 text-center md:py-24">
        {/* festive gradient ground */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #ff6a14 0%, var(--desi-orange) 45%, #ff3d8b 120%)" }}
        />
        {/* sun rising from the base — rays fan up behind the copy, bright core
            stays low so the headline sits over solid colour */}
        <div aria-hidden className="pointer-events-none absolute bottom-[-32%] left-1/2 -translate-x-1/2">
          <Sunburst size="min(760px,130%)" rays={34} spin color="rgba(255,255,255,0.13)" core={null} rayStart={0.34} />
        </div>

        {/* rangoli edges */}
        <RangoliDivider color="rgba(255,255,255,0.8)" className="absolute inset-x-0 top-0" />

        {/* skyline grounding the base */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 opacity-90">
          <Skyline color="rgba(90,20,0,0.5)" height={110} />
        </div>

        <div className="relative">
          <RevealHeading
            as="h2"
            className="font-display mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white md:text-4xl"
          >
            One connected ecosystem for modern business operations
          </RevealHeading>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Replace fragmented subscriptions with focused systems for bookings,
            payments, events, communities, and customer workflows, all working
            together so your business runs with more control, clarity, and
            ownership.
          </p>
          <InPageAnchor
            href="#ecosystem"
            className="btn group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-[var(--desi-orange)] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)] hover:bg-[var(--desi-cream)]"
          >
            Explore the Ecosystem
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </InPageAnchor>
        </div>
      </Reveal>
    </section>
  );
}
