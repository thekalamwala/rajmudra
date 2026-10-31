import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { MandalaSeal, FestiveBand, Flower } from "@/components/desi";

// Full-bleed indigo poster CTA (Desi Digital) — deep-indigo ground, halftone
// print texture, a static corner Rajmudra seal and scattered flowers, framed by
// the signature festive band. Copy and buttons unchanged.
export function AboutCta() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <FestiveBand height={20} />

      <div className="desi-indigo-panel relative px-6 py-20 md:py-24">
        {/* printed-poster dot texture */}
        <div
          aria-hidden
          className="desi-halftone pointer-events-none absolute inset-0 opacity-60"
          style={{ ["--dot" as string]: "rgba(255,255,255,0.1)" }}
        />
        {/* static corner mandala + a faint one top-left */}
        <MandalaSeal size={300} color="var(--desi-marigold)" className="pointer-events-none absolute bottom-4 right-4 opacity-95" />
        <MandalaSeal size={200} color="rgba(255,255,255,0.10)" className="pointer-events-none absolute -left-16 -top-16" />
        {/* scattered flowers */}
        <Flower size={28} color="var(--desi-marigold)" className="pointer-events-none absolute left-[12%] top-[20%]" />
        <Flower size={20} color="var(--desi-magenta)" center="var(--desi-marigold)" className="pointer-events-none absolute right-[18%] top-[26%]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="max-w-md">
            <RevealHeading as="h2" className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
              Have an idea? Let&apos;s build
              <br />
              <span className="text-[var(--desi-marigold)]">something great.</span>
            </RevealHeading>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Whether you need a new website, a better digital experience, or a
              clear direction for your next project, we&apos;d love to hear what
              you&apos;re working on.
            </p>
            <div className="mt-9 flex flex-col items-start gap-5">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-[var(--desi-indigo)] transition-colors duration-300 hover:bg-[var(--desi-cream)]"
              >
                Start a Project
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Tell us about your project
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FestiveBand height={20} flip />
    </section>
  );
}
