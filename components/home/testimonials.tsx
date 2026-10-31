import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { RangoliDivider } from "@/components/desi";
import { site } from "@/lib/site";

const quotes = [
  "We stopped depending on disconnected tools for bookings and payments. Everything now runs through one stable workflow built for ownership.",
  "Rajmudra gave our business direct control over customers, revenue, and operations without relying on third-party platforms to keep everything running.",
  "Instead of paying for multiple subscriptions every month, we consolidated our workflows into systems we actually control and fully own.",
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < 4
              ? "size-4 fill-[var(--desi-marigold)] text-[var(--desi-marigold)]"
              : "size-4 fill-[var(--desi-marigold)]/35 text-[var(--desi-marigold)]/35"
          }
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="desi-indigo-panel relative overflow-hidden text-white">
      {/* rangoli edges */}
      <RangoliDivider color="var(--desi-marigold)" className="absolute inset-x-0 top-0 opacity-70" />
      <RangoliDivider color="var(--desi-marigold)" flip className="absolute inset-x-0 bottom-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <RevealHeading as="h2" className="font-display text-3xl font-extrabold md:text-4xl">
              Built for modern businesses replacing platform dependency
            </RevealHeading>
          </div>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm"
            >
              <span aria-hidden className="absolute right-5 top-3 font-display text-6xl leading-none text-[var(--desi-marigold)]/25">&rdquo;</span>
              <Stars />
              <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-white/90">
                &ldquo;{q}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-xs text-white/55">
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
