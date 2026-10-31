import Link from "next/link";
import { ArrowRight, CalendarCheck, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";
import { site } from "@/lib/site";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { MandalaSeal } from "@/components/desi";

export function SmmFinalCta() {
  return (
    <section className="w-full">
      <Reveal className="desi-indigo-panel relative isolate overflow-hidden px-6 py-16 text-center text-white md:px-8 md:py-20">
        <div
          aria-hidden
          className="desi-halftone pointer-events-none absolute inset-0 opacity-60"
          style={{ ["--dot" as string]: "rgba(255,255,255,0.1)" }}
        />
        <MandalaSeal size={230} color="var(--desi-marigold)" className="pointer-events-none absolute bottom-3 right-3 opacity-90" />
        <div className="relative z-10">
          <RevealHeading as="h2" className="mx-auto max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {smm.finalCta.heading}
          </RevealHeading>
          <p className="mx-auto mt-5 max-w-xl text-white/75 md:text-lg">{smm.finalCta.body}</p>
          <div className="mt-9 flex flex-col gap-3 [&>*]:w-full [&>*]:justify-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:[&>*]:w-auto">
            <Link
              href={smm.finalCta.primaryCta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              <MessageCircle className="size-4" />
              {smm.finalCta.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={site.demoUrl}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <CalendarCheck className="size-4" />
              {smm.finalCta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}