import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { MandalaSeal, Flower } from "@/components/desi";

export function SeoFinalCta() {
  return (
    <section className="w-full px-6 py-16">
      {/* indigo festive poster card */}
      <Reveal className="relative isolate overflow-hidden rounded-3xl px-8 py-16 text-center text-white md:py-20">
        <div aria-hidden className="desi-indigo-panel absolute inset-0" />
        <div
          aria-hidden
          className="desi-halftone pointer-events-none absolute inset-0 opacity-60"
          style={{ ["--dot" as string]: "rgba(255,255,255,0.1)" }}
        />
        <MandalaSeal size={230} color="var(--desi-marigold)" className="pointer-events-none absolute bottom-3 right-3 opacity-90" />
        <Flower size={22} color="var(--desi-magenta)" center="var(--desi-marigold)" className="pointer-events-none absolute left-[10%] top-[16%]" />
        <div className="relative z-10">
        <RevealHeading as="h2" className="text-3xl font-black tracking-tight text-white md:text-5xl">
          See exactly where your site stands, free
        </RevealHeading>
        <p className="mx-auto mt-5 max-w-xl text-white/75 md:text-lg">
          Run the instant AI + SEO audit, then get a clear, honest plan to fix what&apos;s
          holding your Nagpur rankings back. No sign-up, no obligation.
        </p>
        <div className="mt-9 flex flex-col gap-3 [&>*]:w-full [&>*]:justify-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:[&>*]:w-auto">
          <InPageAnchor
            href="#top"
            className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
          >
            Run my free audit
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </InPageAnchor>
          <InPageAnchor
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to us
          </InPageAnchor>
        </div>
        </div>
      </Reveal>
    </section>
  );
}
