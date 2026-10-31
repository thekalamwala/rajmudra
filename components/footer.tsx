import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  GoogleLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { footerRows, type SiteLink } from "@/lib/site-links";
import { site } from "@/lib/site";
import { ScallopBorder, FlowerDivider, CornerLeaf, WarliDancers, WarliVillage, WarliBorder } from "@/components/desi";

// Site-wide footer: compact, festive, folk-art (Warli) framed — sized to fit on
// one screen. Two rows of link columns from lib/site-links.

const social = [
  { label: "LinkedIn", href: site.social.linkedin, icon: LinkedinLogo },
  { label: "Instagram", href: site.social.instagram, icon: InstagramLogo },
  { label: "X", href: site.social.twitter, icon: XLogo },
  { label: "YouTube", href: site.social.youtube, icon: YoutubeLogo },
  { label: "Google reviews", href: site.social.google, icon: GoogleLogo },
].filter((s) => s.href !== "#");

export function Footer() {
  const [row1, row2] = footerRows;

  return (
    <footer className="mt-auto">
      {/* scalloped + dotted top edge */}
      <ScallopBorder color="var(--desi-orange)" radius={12} />
      <div className="relative overflow-hidden bg-[var(--desi-cream)]">
        <div className="mx-auto h-0 w-full max-w-6xl border-t border-dotted border-[var(--desi-orange)]/50" />
        {/* top-corner flourishes */}
        <CornerLeaf color="var(--desi-orange)" className="left-3 top-2 -rotate-90" />
        <CornerLeaf color="var(--desi-orange)" className="right-3 top-2 rotate-180" />

        <div className="relative mx-auto max-w-6xl px-6 pb-11 pt-6">
          {/* Row 1: company info + Services, Products, Company */}
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" aria-label="Rajmudra home" className="flex items-center">
                <Image src="/brand/rajmudra/horizontal-full-color.svg" alt="Rajmudra" width={164} height={30} className="h-[28px] w-auto" />
              </Link>
              <ul className="mt-3 space-y-1.5 text-[13px] text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>Eureka Coworking, Pratap Nagar Metro Square, Nagpur, Maharashtra</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-brand" />
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{site.contact.phone}</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0 text-brand" />
                  <a href={`mailto:${site.contact.email}`} className="hover:text-foreground">{site.contact.email}</a>
                </li>
              </ul>
              <div className="mt-3 flex gap-2">
                {social.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon className="size-[18px]" weight="fill" />
                  </a>
                ))}
              </div>
            </div>

            {row1.map((g) => (
              <FooterCol key={g.title} title={g.title} links={g.links} />
            ))}
          </div>

          <FlowerDivider className="my-4 max-w-4xl mx-auto" />

          {/* Row 2: Initiatives, Community, Others, Legals */}
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {row2.map((g) => (
              <FooterCol key={g.title} title={g.title} links={g.links} />
            ))}
          </div>

          <FlowerDivider className="mt-5 max-w-4xl mx-auto" />

          {/* bottom bar — one centered line */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] text-muted-foreground">
            <span>© {new Date().getFullYear()} Rajmudra. All rights reserved.</span>
            <span aria-hidden className="text-brand/60">·</span>
            <span>Handcrafted by राजमुद्राची मराठी माणसं</span>
          </div>
        </div>

        {/* Warli folk-art scenes above the border */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto max-w-6xl px-6">
          <WarliDancers color="#b0531f" height={44} className="absolute bottom-0 left-6" />
          <WarliVillage color="#b0531f" height={50} className="absolute bottom-0 right-6" />
        </div>

        {/* Warli triangle border */}
        <WarliBorder color="var(--desi-orange)" height={11} className="absolute inset-x-0 bottom-0" />
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: SiteLink[] }) {
  return (
    <div>
      <p className="text-[13px] font-bold">{title}</p>
      <ul className="mt-2.5 space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[13px] text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
