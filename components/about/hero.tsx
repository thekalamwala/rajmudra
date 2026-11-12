import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { Jaali, MandalaSeal } from "@/components/desi";

// About hero, full-bleed section on the warm festive cream ground. Copy on the
// left, the team/about photo on the right in a softly framed card, with jaali
// lattice and a faint Rajmudra mandala in the ambient layer (Desi Digital).

export function AboutHero() {
  return (
    <section className="desi-ground relative flex min-h-[calc(100svh-4rem)] w-full flex-col justify-center overflow-hidden">
      {/* ambient festive background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Jaali size={300} opacity={0.1} className="absolute -right-12 top-10" color="var(--desi-orange)" />
        <Jaali size={220} opacity={0.08} className="absolute -left-12 bottom-8" color="var(--desi-teal)" />
        <MandalaSeal size={360} color="rgba(254,81,0,0.06)" spin="slow" className="absolute -left-24 top-1/4" />
      </div>

      <Reveal className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* copy */}
        <div>
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-text">
            About Rajmudra
          </p>

          <RevealHeading as="h1" className="mt-6 text-[2.35rem] font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            <span className="block">We build digital </span>
            <span className="block">experiences that </span>
            <span className="block text-brand">move businesses forward.</span>
          </RevealHeading>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            RAJMUDRA is a digital design and development partner helping
            ambitious businesses build websites and digital experiences that
            are clear, modern, and built to grow.
          </p>

          <div className="mt-8 flex flex-col gap-3 [&>*]:w-full [&>*]:justify-center sm:flex-row sm:flex-wrap sm:items-center sm:[&>*]:w-auto">
            <Link
              href="/contact"
              className="btn btn-primary group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              Start a Project
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <InPageAnchor
              href="#work"
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              Explore Our Work
            </InPageAnchor>
           </div>
        </div>

        {/* team photo */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div
            aria-hidden
            className="absolute -right-4 -top-4 h-full w-full rounded-[1.5rem] bg-brand/10"
          />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_50px_100px_-40px_rgba(15,17,17,0.3)] h-[380px] lg:h-[440px]">
            <Image
              src="/portfolio/about1.png"
              alt="About Rajmudra, our team and workspace"
              width={735}
              height={1102}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}