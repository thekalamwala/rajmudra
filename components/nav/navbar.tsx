"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  Code,
  FileText,
  MagnifyingGlass,
  PenNib,
  ShareNetwork,
  Storefront,
  PresentationChart,
  BookOpenText,
  GraduationCap,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { featuredProducts } from "@/lib/products";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { FestiveBand, BlockPrint } from "@/components/desi";

// Products come from the shared featured list so the navbar and homepage
// ecosystem never drift. Order + names live in lib/products.ts.
const navProducts = featuredProducts.filter((p) => p.slug !== "indian-sports-club");

type NavService = { name: string; icon: Icon; accent: string; href: string; desc: string };

const serviceGroups: { title: string; icon: Icon; items: NavService[] }[] = [
  {
    title: "Tech",
    icon: Code,
    items: [
      { name: "Website Design", icon: PenNib, accent: "#47143D", href: "/website-design-company-in-nagpur", desc: "Interfaces built to convert, not just impress." },
      { name: "Website Development", icon: Code, accent: "#7a3fc7", href: "/web-development-company-in-nagpur", desc: "Fast, clean builds that ship on time." },
      { name: "Shopify Development", icon: Storefront, accent: "#5e8e3e", href: "/shopify-development-company-in-nagpur", desc: "Storefronts tuned to sell." },
    ],
  },
  {
    title: "Marketing",
    icon: MagnifyingGlass,
    items: [
      { name: "Social Media Marketing", icon: ShareNetwork, accent: "#be123c", href: "/social-media-marketing-company-in-nagpur", desc: "Content that stops the scroll." },
      { name: "Search Engine Optimization", icon: MagnifyingGlass, accent: "#0e9384", href: "/seo-company-in-nagpur", desc: "Rank higher. Get found. Get leads." },
      { name: "Digital Marketing", icon: FileText, accent: "#e39a00", href: "/digital-marketing-company-in-nagpur", desc: "Ad spend that pays back." },
    ],
  },
];

const resourceItems = [
  { name: "Case Studies", href: "/case-studies", icon: PresentationChart, accent: "#fe5100" },
  { name: "Blog", href: "/blog", icon: BookOpenText, accent: "#7a3fc7" },
  { name: "Academy", href: "/academy", icon: GraduationCap, accent: "#0e9384" },
];

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<"services" | null>(null);
  // Delay the close so the cursor can cross the gap between the trigger and the
  // viewport-centered mega panel without the menu snapping shut.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu("services");
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<
    "products" | "services" | "resources" | null
  >("services");

  // Overlay mode: transparent header over the homepage light hero; solidifies
  // to the festive cream bar after a little scroll, and on every other page.
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Close the services menu after navigating (it can be opened by click now).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpenMenu(null);
  }
  const light = pathname === "/" && !scrolled && !mobileOpen;
  const linkBase = "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors";
  // Warm festive hover: marigold-tinted pill, orange text. Hero is light, so
  // nav content stays dark even in the transparent overlay.
  const linkTone = "text-foreground/80 hover:bg-[var(--desi-orange)]/10 hover:text-[var(--desi-orange)]";

  const mobileRow = (item: { name: string; icon: Icon; accent: string; href: string }) => (
    <Link
      key={item.name}
      href={item.href}
      onClick={() => setMobileOpen(false)}
      className="group flex items-center gap-3 rounded-xl p-2 active:bg-[var(--desi-orange)]/10"
    >
      <span
        className="relative grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--a)]/15 text-[var(--a)]"
        style={{ "--a": item.accent } as CSSProperties}
      >
        <item.icon className="size-5" weight="regular" />
        <item.icon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-active:opacity-100" weight="fill" />
      </span>
      <span className="truncate text-sm font-semibold">{item.name}</span>
    </Link>
  );

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        light
          ? "bg-transparent"
          : "bg-[#fbf4e6]/95 backdrop-blur-sm supports-[backdrop-filter]:bg-[#fbf4e6]/80",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Rajmudra home" className="flex items-center">
          <Image
            src="/brand/rajmudra/horizontal-full-color.svg"
            alt="Rajmudra"
            width={175}
            height={32}
            loading="eager"
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {/* Services */}
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <button
              className={cn(linkBase, linkTone, openMenu === "services" && "bg-[var(--desi-orange)]/10 text-[var(--desi-orange)]")}
              aria-expanded={openMenu === "services"}
              aria-controls="nav-services-menu"
              onClick={() => setOpenMenu((m) => (m === "services" ? null : "services"))}
            >
              What We Offer
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  openMenu === "services" && "rotate-180",
                )}
              />
            </button>
            {/* Always in the HTML, hidden until opened: crawlers don't hover, so
                a panel that only mounted on hover hid every service and product
                link from search engines. */}
            <div
              id="nav-services-menu"
              className={cn(
                "fixed left-1/2 top-16 w-[min(1060px,92vw)] -translate-x-1/2 pt-3",
                openMenu !== "services" && "hidden",
              )}
              onMouseEnter={openServices}
              onMouseLeave={scheduleClose}
            >
                <div className="overflow-hidden rounded-[22px] border-2 border-[var(--desi-orange)]/25 bg-[var(--desi-cream)] shadow-[0_32px_80px_-32px_rgba(71,20,61,0.45)]">
                  {/* festive crown — the poster temple-arch lace */}
                  <FestiveBand height={10} />
                  <div className="grid grid-cols-[1.55fr_0.85fr]">
                  {/* left: headline + two service columns */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                      Quality over quantity, always
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      End-to-end tech and marketing, built in Nagpur.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1">
                      {serviceGroups.map((g) => (
                        <div key={g.title}>
                          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                            <g.icon className="size-4" weight="fill" />
                            {g.title}
                          </p>
                          {g.items.map((s) => (
                            <Link
                              key={s.name}
                              href={s.href}
                              className="group relative flex items-start gap-3 overflow-hidden rounded-xl p-2"
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                                style={{ backgroundColor: `${s.accent}1f` }}
                              />
                              <span
                                className="relative z-10 mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--a)]/15 text-[var(--a)]"
                                style={{ "--a": s.accent } as CSSProperties}
                              >
                                <s.icon className="size-5" weight="regular" />
                                <s.icon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" weight="fill" />
                              </span>
                              <span className="relative z-10 min-w-0">
                                <span className="block text-sm font-semibold text-foreground">{s.name}</span>
                                <span className="block truncate text-xs text-muted-foreground">{s.desc}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* right: festive indigo poster rail with the SaaS products */}
                  <div
                    className="relative overflow-hidden border-l border-[var(--desi-marigold)]/25 p-6 text-white"
                    style={{
                      background:
                        "radial-gradient(90% 80% at 85% 0%, rgba(254,81,0,0.30), transparent 55%), radial-gradient(80% 80% at 0% 100%, rgba(232,15,122,0.24), transparent 55%), linear-gradient(150deg, #3a1420 0%, #57203a 50%, #25101a 100%)",
                    }}
                  >
                    <BlockPrint color="rgba(255,183,3,0.9)" opacity={0.1} className="absolute inset-0" />
                    <p className="relative text-sm font-bold text-white">Software as a Service</p>
                    <div className="relative mt-3 space-y-1">
                      {navProducts.map((p) => (
                        <Link
                          key={p.name}
                          href={p.href}
                          className="block rounded-lg px-2 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* footer strip */}
                  <div className="col-span-2 flex flex-wrap items-center gap-x-8 gap-y-2 border-t-2 border-[var(--desi-orange)]/15 bg-[var(--desi-cream)] px-6 py-3">
                    {navLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-[var(--desi-orange)] hover:underline"
                      >
                        {l.label}
                      </Link>
                    ))}
                    <Link
                      href={site.demoUrl}
                      className="text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-[var(--desi-orange)] hover:underline"
                    >
                      Book A Meeting
                    </Link>
                  </div>
                  </div>
                </div>
            </div>
          </div>

          <Link
            href="/case-studies"
            className={cn(linkBase, linkTone)}
          >
            Portfolio
          </Link>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(linkBase, linkTone)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={site.demoUrl}
            className="btn btn-primary hidden rounded-full px-5 py-2 text-sm font-bold text-brand-foreground shadow-[0_14px_32px_-14px_rgba(254,81,0,0.75)] ring-1 ring-inset ring-[var(--desi-marigold)]/50 md:inline-block"
          >
            Book A Meeting
          </Link>
          <button
            className="grid size-10 place-items-center rounded-lg text-foreground hover:bg-[var(--desi-orange)]/10 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* festive band hangs just under the solid bar (the poster seam edge).
          Hidden while the mobile sheet is open so it never overlaps its content. */}
      {!light && !mobileOpen && <FestiveBand height={9} className="absolute inset-x-0 top-full" />}
      </header>

      {/* mobile menu, full-screen festive sheet with collapsible sections */}
      {mobileOpen && (
        <div className="desi-ground fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto px-6 pb-10 pt-2 md:hidden">
          {/* Services */}
          <button
            className="flex w-full items-center justify-between border-b-2 border-[var(--desi-orange)]/15 py-4 text-base font-bold"
            onClick={() =>
              setMobileSection((s) => (s === "services" ? null : "services"))
            }
          >
            What We Offer
            <ChevronDown
              className={cn(
                "size-5 transition-transform",
                mobileSection === "services" && "rotate-180",
              )}
            />
          </button>
          {mobileSection === "services" && (
            <div className="py-2">
              {serviceGroups.map((g) => (
                <div key={g.title} className="pb-2">
                  <p className="px-2 pb-1 text-xs font-bold uppercase tracking-wide text-[var(--desi-orange)]">
                    {g.title}
                  </p>
                  {g.items.map(mobileRow)}
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          <button
            className="flex w-full items-center justify-between border-b-2 border-[var(--desi-orange)]/15 py-4 text-base font-bold"
            onClick={() =>
              setMobileSection((s) => (s === "products" ? null : "products"))
            }
          >
            What We Built
            <ChevronDown
              className={cn(
                "size-5 transition-transform",
                mobileSection === "products" && "rotate-180",
              )}
            />
          </button>
          {mobileSection === "products" && (
            <div className="py-2">{navProducts.map(mobileRow)}</div>
          )}

          {/* Resources */}
          <button
            className="flex w-full items-center justify-between border-b-2 border-[var(--desi-orange)]/15 py-4 text-base font-bold"
            onClick={() =>
              setMobileSection((s) => (s === "resources" ? null : "resources"))
            }
          >
            Resources
            <ChevronDown
              className={cn(
                "size-5 transition-transform",
                mobileSection === "resources" && "rotate-180",
              )}
            />
          </button>
          {mobileSection === "resources" && (
            <div className="py-2">{resourceItems.map(mobileRow)}
            </div>
          )}

          {navLinks.length > 0 &&
            navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block border-b-2 border-[var(--desi-orange)]/15 py-4 text-base font-bold active:text-[var(--desi-orange)]"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}

          <Link
            href={site.demoUrl}
            className="btn btn-primary mt-6 block rounded-full px-4 py-3 text-center text-sm font-bold text-brand-foreground shadow-[0_14px_32px_-14px_rgba(254,81,0,0.75)]"
            onClick={() => setMobileOpen(false)}
          >
            Book A Meeting
          </Link>

          {/* festive foot */}
          <div className="mt-6">
            <FestiveBand height={12} />
          </div>
        </div>
      )}
    </>
  );
}
