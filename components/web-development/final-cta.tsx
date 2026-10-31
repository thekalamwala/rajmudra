import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { MandalaSeal } from "@/components/desi";

// ponytail: no WhatsApp deep link yet, needs a real number. Add a wa.me
// secondary CTA here once one exists (blueprint MUST-HAVE); until then both
// paths route to the on-page form rather than shipping a dead link.
export function WdFinalCta() {
  return (
    <section className="w-full">
      <Reveal className="desi-indigo-panel relative isolate overflow-hidden px-6 py-16 text-center md:px-8 md:py-20">
        <div
          aria-hidden
          className="desi-halftone pointer-events-none absolute inset-0 opacity-60"
          style={{ ["--dot" as string]: "rgba(255,255,255,0.1)" }}
        />
        <MandalaSeal size={230} color="var(--desi-marigold)" className="pointer-events-none absolute bottom-3 right-3 opacity-90" />
        <div className="relative z-10">
        <RevealHeading as="h2" className="text-3xl font-black tracking-tight text-white md:text-5xl">
          Ready to Build Something That Loads Fast and Ranks?
        </RevealHeading>
        <p className="mx-auto mt-5 max-w-xl text-white/70 md:text-lg">
          Send us your project. Get a fixed scope, a fixed price and a written timeline within
          one business day, and keep full ownership of everything we build.
        </p>
        <div className="mt-9 flex flex-col gap-3 [&>*]:w-full [&>*]:justify-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:[&>*]:w-auto">
          <InPageAnchor
            href="#contact"
            className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
          >
            Get a Fixed Quote in 24 Hours
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </InPageAnchor>
          <InPageAnchor
            href="#work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            See our work
          </InPageAnchor>
        </div>
        </div>
      </Reveal>
    </section>
  );
}