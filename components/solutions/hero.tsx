import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { MandalaSeal } from "@/components/desi";

const stats = [
  { value: "10", label: "products designed, built & run" },
  { value: "7", label: "audiences, one ecosystem" },
  { value: "0%", label: "platform commission on sales" },
  { value: "100%", label: "your code, your data" },
];

export function SolHero() {
  return (
    <section className="desi-indigo-panel relative -mt-16 overflow-hidden text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% -5%, rgba(254,81,0,0.28) 0%, transparent 62%), radial-gradient(45% 40% at 82% 18%, rgba(232,15,122,0.16) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="desi-halftone pointer-events-none absolute inset-0 opacity-50"
        style={{ ["--dot" as string]: "rgba(255,255,255,0.09)" }}
      />
      <MandalaSeal size={360} color="rgba(255,255,255,0.06)" spin="slow" className="pointer-events-none absolute -right-20 top-10" />
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-28 text-center md:pb-20 md:pt-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            Solutions
          </span>
        </Reveal>
        <RevealHeading
          as="h1"
          className="mt-6 text-[2.07rem] font-black leading-[1.08] tracking-tight md:text-[3.37rem]"
        >
          Software that fits <span className="text-brand">how you work.</span>
        </RevealHeading>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-3xl text-base text-white/60 md:text-lg">
            Creators, campuses, shops, events, communities, sports clubs and D2C
            brands — each gets a stack of products we design, build and run
            together, on systems you own instead of rent.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col gap-3 [&>*]:w-full [&>*]:justify-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:[&>*]:w-auto">
            <InPageAnchor
              href="#build"
              className="btn btn-primary group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              Find your stack
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </InPageAnchor>
            <Link
              href="/book-a-demo"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Book a demo
            </Link>
          </div>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-2 gap-[21px] lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left"
            >
              <span className="text-3xl font-black tracking-tight text-brand">
                {s.value}
              </span>
              <span className="text-sm font-semibold text-white/80">
                {s.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
