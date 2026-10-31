import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { MandalaSeal, Flower } from "@/components/desi";

export function SolFinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      {/* indigo festive poster card */}
      <Reveal className="relative isolate overflow-hidden rounded-3xl px-8 py-16 text-center text-white md:py-20">
        <div aria-hidden className="desi-indigo-panel absolute inset-0" />
        <div
          aria-hidden
          className="desi-halftone pointer-events-none absolute inset-0 opacity-60"
          style={{ ["--dot" as string]: "rgba(255,255,255,0.1)" }}
        />
        <MandalaSeal size={230} color="var(--desi-marigold)" className="pointer-events-none absolute bottom-3 right-3 opacity-90" />
        <Flower size={22} color="var(--desi-magenta)" center="var(--desi-marigold)" className="pointer-events-none absolute left-[10%] top-[18%]" />
        <RevealHeading
          as="h2"
          className="relative z-10 mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          Not sure which stack fits? Tell us who you serve.
        </RevealHeading>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-white/75">
          A short call is enough: we map your workflow to the products that fit,
          show you what running them looks like, and you decide from there.
        </p>
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-a-demo"
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[var(--desi-indigo)] transition-colors hover:bg-[var(--desi-cream)]"
          >
            Book a demo
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="text-sm font-bold text-white underline decoration-[var(--desi-marigold)]/60 underline-offset-4 transition-colors hover:decoration-[var(--desi-marigold)]"
          >
            Or contact us
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
