import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin, Timer } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { site } from "@/lib/site";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { Jaali, MandalaSeal } from "@/components/desi";

export function ContactHero() {
  return (
    <section className="desi-ground relative overflow-hidden">
      {/* ambient festive background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Jaali size={240} opacity={0.1} className="absolute -right-10 top-6" color="var(--desi-orange)" />
        <Jaali size={200} opacity={0.08} className="absolute -left-10 bottom-6" color="var(--desi-teal)" />
        <MandalaSeal size={320} color="rgba(254,81,0,0.05)" spin="slow" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <Reveal>

          <RevealHeading as="h1" className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
            Say hello.{" "}
            <span className="text-brand">We read every message.</span>
          </RevealHeading>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            A product idea, a project brief, or just a question about how we
            work, tell us what you&apos;re building and we&apos;ll get back to
            you within one business day.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-brand" />
              Based in {site.contact.city}, {site.contact.region}
            </span>
            <span className="inline-flex items-center gap-2">
              <Timer className="size-4 text-brand" />
              {site.contact.responseTime}
            </span>
          </div>

          <div className="mt-9 flex flex-col gap-3.5 [&>*]:w-full [&>*]:justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:[&>*]:w-auto">
            <InPageAnchor
              href="#contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              Start a conversation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </InPageAnchor>
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
            >
              <CalendarClock className="size-4" />
              Book a meeting
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}