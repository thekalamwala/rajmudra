"use client";

import { useRef } from "react";
import { Boxes, Coins, ShieldCheck, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealHeading } from "@/components/anim/reveal-heading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Desi "foundation": a central Rajmudra mandala feeds three ownership pillars
// through festive connectors; coloured pulses flow down each line. Content is a
// placeholder default (ownership pillars) — swap freely.
const pillars: {
  icon: LucideIcon;
  title: string;
  body: string;
  color: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "You own your data",
    body: "Your customers, revenue, and audience live in systems you control, never rented, never locked in.",
    color: "var(--desi-teal)",
  },
  {
    icon: Coins,
    title: "Zero platform commissions",
    body: "Keep what you earn. No per-transaction cuts skimmed by a middleman platform.",
    color: "var(--desi-magenta)",
  },
  {
    icon: Boxes,
    title: "Portable infrastructure",
    body: "One connected foundation for bookings, payments, events, and communities, that moves with you.",
    color: "var(--desi-orange)",
  },
];

const traces = [
  { d: "M560 118 V170 Q560 180 550 180 H210 Q200 180 200 190 V300", color: "#0e9384" },
  { d: "M600 132 V300", color: "#e80f7a" },
  { d: "M640 118 V170 Q640 180 650 180 H990 Q1000 180 1000 190 V300", color: "#fe5100" },
];

export function PoweredBy() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const paths = gsap.utils.toArray<SVGPathElement>(".pb-pulse");
        paths.forEach((path, i) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: `28 ${len}`, strokeDashoffset: 0 });
          gsap.to(path, {
            strokeDashoffset: -(len + 28),
            duration: 2.6,
            ease: "none",
            repeat: -1,
            delay: i * 0.5,
          });
        });
      });
      gsap.from(".pb-card", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <RevealHeading as="h2" className="font-display mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight md:text-4xl">
        Built on a foundation you actually{" "}
        <span className="desi-gradient-text">control</span>
      </RevealHeading>

      {/* foundation hub + connectors */}
      <div className="relative mt-14">
        {/* foundation label */}
        <div className="absolute left-1/2 top-[9%] z-10 -translate-x-1/2">
          <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-text">
            Powered by Rajmudra
          </span>
        </div>

        <svg viewBox="0 0 1200 320" className="h-auto w-full" fill="none" aria-hidden>
          {/* dim base traces */}
          {traces.map((t, i) => (
            <path key={`base-${i}`} d={t.d} stroke="currentColor" className="text-border" strokeWidth={2} />
          ))}
          {/* animated colored pulses */}
          {traces.map((t, i) => (
            <path
              key={`pulse-${i}`}
              className="pb-pulse"
              d={t.d}
              stroke={t.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${t.color})` }}
            />
          ))}
          {/* endpoint flowers */}
          {[200, 600, 1000].map((x, i) => (
            <g key={x} transform={`translate(${x} 300)`}>
              {Array.from({ length: 6 }).map((_, p) => (
                <ellipse key={p} cx={0} cy={-7} rx={3} ry={5} transform={`rotate(${p * 60})`} fill={traces[i].color} />
              ))}
              <circle r={3.4} fill="var(--card)" stroke={traces[i].color} strokeWidth={1.6} />
            </g>
          ))}
        </svg>

        {/* cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="pb-card relative overflow-hidden rounded-2xl border border-border bg-card p-7"
              style={{ ["--a" as string]: p.color }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: p.color }} />
              <span
                className="grid size-11 place-items-center rounded-xl"
                style={{ background: "color-mix(in srgb, var(--a) 14%, transparent)", color: p.color }}
              >
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
