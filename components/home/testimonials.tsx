import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { FestiveFrame, Jaali } from "@/components/desi";
import { site } from "@/lib/site";

const quotes = [
  {
    text: "We stopped depending on disconnected tools for bookings and payments. Everything now runs through one stable workflow built for ownership.",
    accent: "var(--desi-orange)",
  },
  {
    text: "Rajmudra gave our business direct control over customers, revenue, and operations without relying on third-party platforms to keep everything running.",
    accent: "var(--desi-magenta)",
  },
  {
    text: "Instead of paying for multiple subscriptions every month, we consolidated our workflows into systems we actually control and fully own.",
    accent: "var(--desi-teal)",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < 4 ? "size-4 fill-[#e39a00] text-[#e39a00]" : "size-4 fill-[#e39a00]/30 text-[#e39a00]/30"
          }
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      {/* jaali lattice corners */}
      <Jaali size={230} opacity={0.13} className="absolute -left-10 -top-6" color="var(--desi-orange)" />
      <Jaali size={190} opacity={0.12} className="absolute -right-8 bottom-10" color="var(--desi-teal)" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <RevealHeading as="h2" className="font-display text-3xl font-extrabold md:text-4xl">
            Built for modern businesses replacing platform dependency
          </RevealHeading>
        </Reveal>

        <Reveal stagger className="mt-8 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.text}
              className="relative flex flex-col overflow-hidden rounded-[22px] bg-card p-7 pb-11"
              style={{ border: `2px solid ${q.accent}`, boxShadow: `0 20px 50px -38px ${q.accent}`, ["--a" as string]: q.accent }}
            >
              <FestiveFrame color={q.accent} />
              <span
                aria-hidden
                className="font-display absolute right-5 top-2 text-6xl leading-none"
                style={{ color: "color-mix(in srgb, var(--a) 32%, transparent)" }}
              >
                &rdquo;
              </span>
              <Stars />
              <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="relative mt-6 text-xs text-muted-foreground">
                Rated 4.5/5, from over 100 reviews
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <a
            href={site.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-green inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white"
          >
            Read our reviews on Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}
