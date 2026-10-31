"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { skipEntrance, useIsClientMount } from "@/components/anim/entrance";
import { InPageAnchor } from "@/components/shared/in-page-anchor";
import { Fort } from "@/components/desi";

// Festive daytime poster hero: warm cream ground, marigold sun rays and a
// sandstone hill-fort along the base. Headline with a rotating typewriter word
// and one big CTA, sized to sit fully above the fold over the fort.

const TYPED = ["website.", "web app.", "online store.", "brand.", "traffic.", "revenue.", "audience.", "community.", "leads."];

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
        className="desi-rays desi-spin-slower pointer-events-none absolute left-1/2 top-[82%] aspect-square w-[150vw] max-w-[1500px] -translate-x-1/2 -translate-y-1/2 opacity-[0.2]"
        style={{ ["--ray" as string]: "rgba(254,81,0,0.85)", ["--rays-fade" as string]: "5%" }}
      />

      {/* soft warm glow behind the feature cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[2%] left-1/2 h-[440px] w-[860px] max-w-[94vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(254,81,0,0.26) 0%, rgba(232,15,122,0.12) 48%, transparent 72%)" }}
      />

      {/* sandstone hill-fort grounds the scene (sits on the base, covering the
          lower rays so none stray below it) */}
      {/* hill-fort + its tall central flag. The flag sits BEHIND the fort
          (lower z) so the fort hides the planted pole base; the pole is centred
          on its SVG so it lands over the middle of the gate. `isolate` makes the
          z-order reliable (an absolute child otherwise paints over the in-flow
          fort SVG regardless of DOM order). */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 isolate">
        <div className="absolute bottom-[150px] left-1/2 z-0 -translate-x-1/2">
          <svg width="44" height="92" viewBox="0 0 44 92" role="presentation">
            <line x1="22" y1="92" x2="22" y2="5" stroke="#5f2e16" strokeWidth="3" strokeLinecap="round" />
            <circle cx="22" cy="4" r="3.2" fill="#5f2e16" />
            <g className="desi-flag">
              <path d="M23 7 L 43 14.5 L 23 22 Z" fill="#ff7d1f" />
            </g>
          </svg>
        </div>
        <div className="relative z-10">
          <Fort height={184} />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl -translate-y-[50px] flex-col items-center px-6 pb-40 pt-24 text-center md:pt-28">
        <h1 className="hero-up hm-hero-h1 font-display font-extrabold tracking-tight">
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
      </div>
    </section>
  );
}
