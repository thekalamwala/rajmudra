import { Boxes, ServerCog, UserCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { FestiveFrame, FlowerDivider, Jaali } from "@/components/desi";

const props = [
  {
    icon: Boxes,
    title: "Replace fragmented workflows",
    body: "Run bookings, payments, events, and communities from one connected system without juggling tools.",
    accent: "var(--desi-orange)",
  },
  {
    icon: UserCheck,
    title: "Own your customer relationships",
    body: "Keep your users, revenue, and audience under your control instead of platform dependency.",
    accent: "var(--desi-magenta)",
  },
  {
    icon: ServerCog,
    title: "Build on infrastructure you control",
    body: "Own your operational systems and keep your business stable without recurring platform lock-ins.",
    accent: "var(--desi-teal)",
  },
];

export function ValueProps() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* faint jaali lattice in the corners */}
      <Jaali size={240} opacity={0.1} className="absolute -right-10 -top-6" color="var(--desi-orange)" />
      <Jaali size={190} opacity={0.08} className="absolute -left-10 bottom-10" color="var(--desi-teal)" />
      <Jaali size={190} opacity={0.08} className="absolute -right-6 bottom-0" color="var(--desi-magenta)" />

      <div className="relative mx-auto max-w-6xl px-6">
        <FlowerDivider className="mx-auto max-w-4xl" />

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center text-center">
          <RevealHeading as="h2" className="font-display text-3xl font-extrabold md:text-4xl">
            Built with ownership-first systems for modern businesses
          </RevealHeading>
        </div>

        <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {props.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-[22px] bg-card p-7 pb-11 transition-transform duration-300 hover:-translate-y-1.5"
              style={{
                border: `2px solid ${p.accent}`,
                boxShadow: `0 20px 50px -38px ${p.accent}`,
                ["--a" as string]: p.accent,
              }}
            >
              <FestiveFrame color={p.accent} />

              {/* soft accent blob behind the icon */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-10 size-32 rounded-full blur-2xl"
                style={{ background: "color-mix(in srgb, var(--a) 24%, transparent)" }}
              />

              <span
                className="relative grid size-16 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                style={{ background: "color-mix(in srgb, var(--a) 15%, transparent)", color: p.accent, boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--a) 30%, transparent)" }}
              >
                <p.icon className="size-7" strokeWidth={1.6} />
              </span>

              <h3 className="font-display relative mt-6 text-xl font-extrabold leading-tight">{p.title}</h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </Reveal>

        <FlowerDivider className="mx-auto mt-16 max-w-4xl" />
      </div>
    </section>
  );
}
