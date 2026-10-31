import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import {
  Code,
  FileText,
  MagnifyingGlass,
  PenNib,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { Skyline, FestiveFrame, FlowerDivider, Jaali } from "@/components/desi";

// Homepage "ecosystem" bento: the five services we sell, as mixed-size tiles.
// Desi Digital: each tile wears a festive frame (accent border, corner leaf
// flourishes, scallop lace), with jaali corners on the section ground.

type Service = {
  name: string;
  tagline: string;
  href: string;
  icon: Icon;
  accent: string;
  points?: string[];
  featured?: boolean;
};

const services: Service[] = [
  {
    name: "Website Development",
    tagline: "Fast, clean builds that ship on time.",
    href: "/web-development-company-in-nagpur",
    icon: Code,
    accent: "#269cef",
    points: ["Websites & landing pages", "Web apps & dashboards", "API & integrations"],
  },
  {
    name: "Website Design",
    tagline: "Interfaces built to convert, not just impress.",
    href: "/website-design-company-in-nagpur",
    icon: PenNib,
    accent: "#47143D",
    featured: true,
  },
  {
    name: "Social Media Marketing",
    tagline: "Content that stops the scroll.",
    href: "/social-media-marketing-company-in-nagpur",
    icon: ShareNetwork,
    accent: "#be123c",
  },
  {
    name: "Search Engine Optimization",
    tagline: "Rank higher. Get found. Get leads.",
    href: "/seo-company-in-nagpur",
    icon: MagnifyingGlass,
    accent: "#0e9384",
  },
  {
    name: "Digital Marketing",
    tagline: "Ad spend that pays back.",
    href: "/digital-marketing-company-in-nagpur",
    icon: FileText,
    accent: "#e39a00",
  },
];

const anchor = services[0];
const rest = services.slice(1);

const PROOF_SLUGS = ["meeticulous", "alluminaty", "eureka-coworking"];
const proof = PROOF_SLUGS.map((slug) => caseStudies.find((cs) => cs.slug === slug)).filter(
  (cs): cs is CaseStudy => Boolean(cs),
);

function ServiceTile({ service }: { service: Service }) {
  const { icon: Icon, accent, name, tagline, href, featured } = service;
  const frameColor = featured ? "var(--desi-magenta)" : accent;
  return (
    <Link
      href={href}
      style={
        featured
          ? { backgroundColor: accent, border: "2px solid var(--desi-magenta)" }
          : { border: `2px solid ${accent}` }
      }
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[18px] p-5 pb-9 transition-[transform,box-shadow]",
        featured
          ? "text-white hover:brightness-110"
          : "bg-card hover:-translate-y-0.5",
      )}
    >
      <FestiveFrame color={frameColor} />
      <span
        className="relative grid size-11 place-items-center rounded-xl"
        style={
          featured
            ? { backgroundColor: "rgba(255,255,255,0.16)", color: "#fff" }
            : { backgroundColor: `${accent}1f`, color: accent }
        }
      >
        <Icon className="size-5" />
      </span>
      <div className="relative mt-6">
        <p className={cn("flex items-center gap-1 font-bold", featured ? "text-white" : "text-foreground")}>
          {name}
          <ArrowUpRight
            className={cn(
              "size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              featured ? "text-white/70" : "text-muted-foreground",
            )}
          />
        </p>
        <p className={cn("mt-0.5 text-sm", featured ? "text-white/75" : "text-muted-foreground")}>
          {tagline}
        </p>
      </div>
    </Link>
  );
}

export function EcosystemBento() {
  const { icon: Icon, accent, href, name, tagline, points } = anchor;

  return (
    <section id="ecosystem" className="relative overflow-hidden py-20 md:py-28">
      {/* jaali lattice corners */}
      <Jaali size={240} opacity={0.09} className="absolute -right-10 top-0" color="var(--desi-orange)" />
      <Jaali size={200} opacity={0.08} className="absolute -left-10 bottom-24" color="var(--desi-teal)" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <RevealHeading as="h2" className="font-display max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            One connected system. Every service, one team.
          </RevealHeading>
        </Reveal>

        <Reveal stagger className="mt-12 grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 md:grid-cols-4">
          {/* anchor service, 2x2 */}
          <Link
            href={href}
            style={{ border: `2px solid ${accent}` }}
            className="group relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-[18px] bg-card p-7 pb-10 transition-transform hover:-translate-y-0.5"
          >
            <FestiveFrame color={accent} />
            <span className="relative grid size-12 place-items-center rounded-2xl" style={{ backgroundColor: `${accent}1f`, color: accent }}>
              <Icon className="size-6" />
            </span>
            <div className="relative mt-6 space-y-2.5">
              {points?.map((p) => (
                <div key={p} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-3 py-2.5">
                  <span className="size-5 shrink-0 rounded-md" style={{ backgroundColor: `${accent}26` }} />
                  <span className="text-sm font-medium text-foreground/80">{p}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-6">
              <p className="flex items-center gap-1 text-xl font-extrabold text-foreground">
                {name}
                <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">{tagline}</p>
            </div>
          </Link>

          {rest.slice(0, 4).map((s) => (
            <ServiceTile key={s.name} service={s} />
          ))}

          {/* stat — festive orange poster tile */}
          <div
            className="relative flex flex-col justify-between overflow-hidden rounded-[18px] bg-brand p-5 pb-9 text-brand-foreground"
            style={{ border: "2px solid rgba(255,255,255,0.4)" }}
          >
            <FestiveFrame color="rgba(255,255,255,0.75)" />
            <p className="relative font-display text-4xl font-black tracking-tight">10+</p>
            <p className="relative text-sm font-semibold">Products designed, built &amp; shipped</p>
          </div>

          {/* ownership — deep festive indigo panel with a skyline, wide */}
          <div
            className="desi-indigo-panel relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[18px] p-7 pb-10 text-white md:col-span-3"
            style={{ border: "2px solid color-mix(in srgb, var(--desi-marigold) 55%, transparent)" }}
          >
            <FestiveFrame color="var(--desi-marigold)" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 opacity-50">
              {/* preserve="none" fits the full silhouette into the short strip
                  (slightly flatter) instead of cropping the tall towers */}
              <Skyline color="rgba(255,183,3,0.5)" height={104} preserve="none" />
            </div>
            <ShieldCheck className="relative size-6 text-[var(--desi-marigold)]" />
            <div className="relative mt-6">
              <p className="font-display text-xl font-extrabold">You own the whole stack.</p>
              <p className="mt-1.5 max-w-md text-sm text-white/75">
                Your code, your data, your infrastructure, no platform commissions, no SaaS rent, no lock-in.
              </p>
            </div>
          </div>
        </Reveal>

        {/* flower divider into the case studies */}
        <FlowerDivider className="mx-auto mt-20 max-w-3xl" />

        {/* Case studies — same cards and grid as /case-studies, three of them. */}
        <Reveal className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <RevealHeading
                as="h3"
                className="font-display max-w-2xl text-3xl font-black tracking-tight md:text-4xl"
              >
                Work we designed, built and shipped
              </RevealHeading>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                The challenges, decisions and results behind real builds by Rajmudra.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-foreground"
            >
              All case studies
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proof.map((cs) => (
            <Reveal key={cs.slug} className="h-full">
              <CaseStudyCard cs={cs} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
