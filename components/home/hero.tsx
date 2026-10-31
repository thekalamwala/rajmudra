"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Database, BadgePercent, LayoutDashboard, TrendingUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { skipEntrance, useIsClientMount } from "@/components/anim/entrance";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { Skyline, FestiveFrame } from "@/components/desi";

// Festive "Diwali-night" poster hero: a glowing sun rising behind an Indian
// skyline under a deep indigo sky. Headline keeps the rotating typewriter word,
// one big CTA, and the 4-card feature row.

const TYPED = ["website.", "web app.", "online store.", "brand.", "traffic.", "revenue.", "audience.", "community.", "leads."];

const features = [
  { icon: Database, label: "Own your code & data", accent: "var(--desi-marigold)" },
  { icon: BadgePercent, label: "No platform commissions", accent: "var(--desi-orange)" },
  { icon: LayoutDashboard, label: "One connected dashboard", accent: "var(--desi-magenta)" },
  { icon: TrendingUp, label: "Scales with your business", accent: "var(--desi-teal)" },
];

// Faint scattered diyas / stars in the night sky (deterministic positions).
const SPARKS = [
  { x: 8, y: 20, s: 4, d: 0 }, { x: 18, y: 42, s: 3, d: 1.2 },
  { x: 27, y: 14, s: 5, d: 0.6 }, { x: 38, y: 30, s: 3, d: 2 },
  { x: 62, y: 24, s: 4, d: 0.3 }, { x: 72, y: 40, s: 3, d: 1.5 },
  { x: 83, y: 18, s: 5, d: 0.9 }, { x: 92, y: 34, s: 3, d: 1.8 },
  { x: 48, y: 12, s: 3, d: 2.4 }, { x: 15, y: 60, s: 3, d: 0.5 },
  { x: 88, y: 56, s: 4, d: 1.1 },
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
        className="ml-0.5 inline-block w-[3px] -translate-y-1 animate-pulse bg-[var(--desi-marigold)] align-middle"
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
    // revertOnUpdate so a StrictMode/HMR remount that interrupts the entrance
    // reverts the .from tween to the natural (visible) state instead of leaving
    // the headline stuck at opacity 0.
    { scope: ref, revertOnUpdate: true },
  );

  return (
    <section
      ref={ref}
      className="relative -mt-16 flex min-h-[calc(100svh+4rem)] items-center overflow-hidden text-white"
    >
      {/* deep festive night sky */}
      <div aria-hidden className="absolute inset-0 desi-indigo-panel" />

      {/* slow radiating rays behind the whole scene */}
      <div
        aria-hidden
        className="desi-rays desi-spin-slower pointer-events-none absolute left-1/2 top-[70%] aspect-square w-[150vw] max-w-[1500px] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        style={{ ["--ray" as string]: "rgba(255,183,3,0.95)", ["--rays-fade" as string]: "5%" }}
      />

      {/* scattered diyas / stars */}
      {SPARKS.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="desi-float pointer-events-none absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: "var(--desi-marigold)",
            boxShadow: "0 0 8px 1px rgba(255,183,3,0.8)",
            ["--d" as string]: `${p.d}s`,
          }}
        />
      ))}

      {/* warm orange glow behind the feature cards (soft bloom, no sun disc) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[3%] left-1/2 h-[440px] w-[860px] max-w-[94vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(254,81,0,0.62) 0%, rgba(232,15,122,0.22) 48%, transparent 72%)" }}
      />

      {/* skyline silhouette grounds the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
        <Skyline color="#0b0820" height={170} />
      </div>

      {/* top vignette keeps the transparent nav legible */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#14102e] to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center md:pt-28">
        <h1 className="hero-up font-display text-[2.07rem] font-extrabold leading-[1.08] tracking-tight md:text-[3.37rem]">
          We turn ambitious ideas into <br />things that grow your <Typewriter />
        </h1>
        <p className="hero-up mt-5 max-w-3xl text-base text-white/65 md:text-lg">
          One team to design, build and grow your business online — websites and apps,
          then the SEO, ads and social to fill them. Built on systems you own, not rent.
        </p>
        <InPageAnchor
          href="#ecosystem"
          className="hero-up group btn btn-primary mt-9 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-brand-foreground shadow-[0_18px_50px_-18px_rgba(254,81,0,0.8)]"
        >
          Explore the Ecosystem
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </InPageAnchor>

        {/* feature cards — desi framed tiles on the night ground */}
        <div className="hero-up mt-16 grid w-full grid-cols-2 gap-[21px] lg:grid-cols-4">
          {features.map(({ icon: Icon, label, accent }) => (
            <div
              key={label}
              className="group relative flex flex-col gap-7 overflow-hidden rounded-2xl p-5 pb-9 text-left backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
              style={{
                border: `1.5px solid color-mix(in srgb, ${accent} 55%, transparent)`,
                background: "rgba(255,255,255,0.05)",
                ["--a" as string]: accent,
              }}
            >
              <FestiveFrame color={accent} />
              <span
                className="relative grid size-12 place-items-center rounded-xl"
                style={{
                  background: "color-mix(in srgb, var(--a) 22%, transparent)",
                  color: accent,
                  boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--a) 40%, transparent)",
                }}
              >
                <Icon className="size-6" />
              </span>
              <span className="relative text-sm font-semibold text-white/90">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
