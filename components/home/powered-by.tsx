"use client";

import { useRef } from "react";
import { Boxes, Coins, ShieldCheck, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { MandalaSeal, FestiveBand, Flower } from "@/components/desi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Full-bleed ORANGE poster moment — a Rajmudra mandala feeds three ownership
// pillars through festive connectors with coloured pulses. White glass cards on
// a marigold-flecked orange field, framed by the signature band. (Mirrors the
// "Growth systems" / "Welcome to the team" posters.)
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
    color: "var(--desi-marigold)",
  },
  {
    icon: Boxes,
    title: "Portable infrastructure",
    body: "One connected foundation for bookings, payments, events, and communities, that moves with you.",
    color: "var(--desi-indigo)",
  },
];

// connector trace colours chosen to pop on the orange ground. Compact vertical
// run (viewBox 0 0 1200 150) so there's no dead space between the hub and nodes.
const traces = [
  { d: "M560 26 V54 Q560 64 550 64 H210 Q200 64 200 74 V136", color: "#0e9384" },
  { d: "M600 32 V136", color: "#ffe39a" },
  { d: "M640 26 V54 Q640 64 650 64 H990 Q1000 64 1000 74 V136", color: "#231a5b" },
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
          // the 28px pulse reaches the endpoint flower near the end of the cycle;
          // flash the flower's glow halo as it arrives, then let it fade.
          const arrive = 2.6 * Math.max(0, (len - 28) / (len + 28));
          const glow = ref.current?.querySelector(`.pb-node-${i} .pb-glow`);
          const tl = gsap.timeline({ repeat: -1, delay: i * 0.5 });
          tl.to(path, { strokeDashoffset: -(len + 28), duration: 2.6, ease: "none" }, 0);
          if (glow) {
            tl.to(glow, { opacity: 0.8, duration: 0.16, ease: "power2.out" }, arrive)
              .to(glow, { opacity: 0, duration: 0.55, ease: "power2.in" }, arrive + 0.16);
          }
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
    <section ref={ref} className="relative isolate overflow-hidden text-white">
      <div
        className="relative px-6 py-16 md:py-20"
        style={{ background: "radial-gradient(120% 90% at 85% 0%, #ff7a2e 0%, transparent 55%), linear-gradient(145deg, #ff6a14 0%, var(--desi-orange) 55%, #e84800 100%)" }}
      >
        {/* printed-poster dot texture */}
        <div
          aria-hidden
          className="desi-halftone pointer-events-none absolute inset-0 opacity-50"
          style={{ ["--dot" as string]: "rgba(255,255,255,0.14)" }}
        />
        {/* watermark mandala + scattered flowers */}
        <MandalaSeal size={300} color="rgba(255,255,255,0.08)" spin="slow" className="pointer-events-none absolute -right-20 -top-16" />
        <Flower size={26} color="var(--desi-marigold)" className="pointer-events-none absolute left-[7%] top-[26%]" />
        <Flower size={18} color="#fff" center="var(--desi-marigold)" className="pointer-events-none absolute right-[9%] bottom-[16%]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <RevealHeading as="h2" className="font-display mx-auto max-w-2xl text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Built on a foundation you actually{" "}
            <span className="text-[var(--desi-marigold)]">control</span>
          </RevealHeading>

          {/* foundation hub + connectors */}
          <div className="relative mt-6">
            {/* animated wiring diagram — cramped on narrow screens, so desktop-only */}
            <div className="relative hidden md:block">
              {/* foundation label */}
              <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
                <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--desi-orange)] shadow-sm">
                  Powered by Rajmudra
                </span>
              </div>

              <svg viewBox="0 0 1200 150" className="mt-2 h-auto w-full" fill="none" aria-hidden>
              {/* dim base traces */}
              {traces.map((t, i) => (
                <path key={`base-${i}`} d={t.d} stroke="rgba(255,255,255,0.28)" strokeWidth={2} />
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
              {/* endpoint flowers — each glows as its pulse lands */}
              {[200, 600, 1000].map((x, i) => {
                const c = traces[i].color;
                return (
                  <g key={x} className={`pb-node pb-node-${i}`} transform={`translate(${x} 136)`}>
                    <circle className="pb-glow" r={13} fill={c} opacity={0} style={{ filter: "blur(5px)" }} />
                    {Array.from({ length: 6 }).map((_, p) => (
                      <ellipse key={p} cx={0} cy={-7} rx={3} ry={5} transform={`rotate(${p * 60})`} fill={c} />
                    ))}
                    <circle r={3.4} fill="#fff" stroke={c} strokeWidth={1.6} />
                  </g>
                );
              })}
              </svg>
            </div>

            {/* white glass cards */}
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="pb-card relative overflow-hidden rounded-2xl bg-white p-7 text-foreground shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
                  style={{ ["--a" as string]: p.color }}
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: p.color }} />
                  <div className="flex items-center gap-4">
                    <span
                      className="grid size-14 shrink-0 place-items-center rounded-2xl"
                      style={{ background: "color-mix(in srgb, var(--a) 15%, transparent)", color: p.color, boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--a) 30%, transparent)" }}
                    >
                      <p.icon className="size-7" strokeWidth={1.6} />
                    </span>
                    <h3 className="font-display text-xl font-extrabold leading-tight">{p.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FestiveBand height={20} flip trim />
    </section>
  );
}
