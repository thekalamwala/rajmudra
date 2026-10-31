import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/website-design";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { MandalaSeal } from "@/components/desi";

export function WdFinalCta() {
  return (
    <section className="w-full">
      <Reveal className="desi-indigo-panel relative isolate overflow-hidden text-center text-white">
        <div
          aria-hidden
          className="desi-halftone pointer-events-none absolute inset-0 opacity-60"
          style={{ ["--dot" as string]: "rgba(255,255,255,0.1)" }}
        />
        <MandalaSeal size={240} color="var(--desi-marigold)" className="pointer-events-none absolute bottom-3 right-3 opacity-90" />
        <div className="relative z-10 px-6 py-20 md:px-12 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Let&apos;s talk</p>
          <RevealHeading as="h2" className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
            {wd.finalCta.title}
          </RevealHeading>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{wd.finalCta.sub}</p>

          <div className="mt-9 flex flex-col gap-3 [&>*]:w-full [&>*]:justify-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:[&>*]:w-auto">
            <Link
              href={wd.finalCta.cta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              {wd.finalCta.cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={wd.finalCta.secondary.href}
              className="group inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {wd.finalCta.secondary.label}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}