"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Database, BadgePercent, LayoutDashboard, TrendingUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { skipEntrance, useIsClientMount } from "@/components/anim/entrance";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { Skyline, FestiveFrame } from "@/components/desi";

// Festive daytime poster hero: warm cream ground, marigold sun rays, an Indian
// skyline along the base and ink copy. Keeps the rotating typewriter word, one
// big CTA, and the 4-card feature row (desi-framed).

const TYPED = ["website.", "web app.", "online store.", "brand.", "traffic.", "revenue.", "audience.", "community.", "leads."];

const features = [
  { icon: Database, label: "Own your code & data", accent: "var(--desi-orange)" },
  { icon: BadgePercent, label: "No platform commissions", accent: "var(--desi-magenta)" },
  { icon: LayoutDashboard, label: "One connected dashboard", accent: "var(--desi-teal)" },
  { icon: TrendingUp, label: "Scales with your business", accent: "#e39a00" },
];

function Typewriter() {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(TYPED[0]);
      return;
    }
    const word = TYPED[wordIdx];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const delay = done ? 1400 : cleared ? 250 : deleting ? 45 : 85;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % TYPED.length);
      } else {
        setText(word.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx]);

  return (
    <span className="desi-gradient-text">
      {text}
      <span
        className="ml-0.5 inline-block w-[3px] -translate-y-1 animate-pulse bg-[var(--desi-orange)] align-middle"
        style={{ height: "0.85em" }}
        aria-hidden
      />
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const clientMount = useIsClientMount();

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      if (skipEntrance(ref.current!, clientMount)) return;
      gsap.timeline()
        .from(q(".hero-up"), { opacity: 0, y: 22, duration: 0.7, ease: "power3.out", stagger: 0.1 });
    },
    { scope: ref, revertOnUpdate: true },
  );

  return (
    <section
      ref={ref}
      className="relative -mt-16 flex min-h-[calc(100svh+4rem)] items-center overflow-hidden text-foreground"
    >
      {/* warm cream festive ground */}
      <div aria-hidden className="absolute inset-0 desi-ground" />

      {/* slow marigold sun rays fanning up from the base */}
      <div
        aria-hidden
        className="desi-rays desi-spin-slower pointer-events-none absolute left-1/2 top-[80%] aspect-square w-[150vw] max-w-[1500px] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
        style={{ ["--ray" as string]: "rgba(254,81,0,0.85)", ["--rays-fade" as string]: "5%" }}
      />

      {/* soft warm glow behind the feature cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[3%] left-1/2 h-[440px] w-[860px] max-w-[94vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(254,81,0,0.26) 0%, rgba(232,15,122,0.12) 48%, transparent 72%)" }}
      />

      {/* skyline silhouette grounds the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 opacity-90">
        <Skyline color="var(--desi-ink)" height={148} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center md:pt-28">
        <h1 className="hero-up font-display text-[2.07rem] font-extrabold leading-[1.08] tracking-tight md:text-[3.37rem]">
          We turn ambitious ideas into <br />things that grow your <Typewriter />
        </h1>
        <p className="hero-up mt-5 max-w-3xl text-base text-muted-foreground md:text-lg">
          One team to design, build and grow your business online — websites and apps,
          then the SEO, ads and social to fill them. Built on systems you own, not rent.
        </p>
        <InPageAnchor
          href="#ecosystem"
          className="hero-up group btn btn-primary mt-9 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-brand-foreground shadow-[0_18px_50px_-18px_rgba(254,81,0,0.7)]"
        >
          Explore the Ecosystem
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </InPageAnchor>

        {/* feature cards — desi framed light tiles */}
        <div className="hero-up mt-16 grid w-full grid-cols-2 gap-[21px] lg:grid-cols-4">
          {features.map(({ icon: Icon, label, accent }) => (
            <div
              key={label}
              className="group relative flex flex-col gap-7 overflow-hidden rounded-2xl bg-card p-5 pb-9 text-left transition-transform duration-300 hover:-translate-y-1"
              style={{ border: `1.5px solid ${accent}`, ["--a" as string]: accent }}
            >
              <FestiveFrame color={accent} />
              <span
                className="relative grid size-12 place-items-center rounded-xl"
                style={{
                  background: "color-mix(in srgb, var(--a) 14%, transparent)",
                  color: accent,
                  boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--a) 30%, transparent)",
                }}
              >
                <Icon className="size-6" />
              </span>
              <span className="relative text-sm font-semibold text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
