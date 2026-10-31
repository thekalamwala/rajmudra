import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { EcosystemBento } from "@/components/home/ecosystem-bento";
import { TopProducts } from "@/components/home/top-products";
import { PoweredBy } from "@/components/home/powered-by";
import { SocialProof } from "@/components/home/social-proof";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { FestiveBand } from "@/components/desi";
import { JsonLd } from "@/components/json-ld";
import { homeLd, faqLd } from "@/lib/jsonld";
import { homeFaq } from "@/lib/home-faq";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: site.url } };

// The signature festive band as the seam between two sections (never mid-section)
// — the same temple-arch lace that frames the social posters, so every break on
// the page reads like a poster edge.
function Seam() {
  return <FestiveBand height={16} className="my-2 opacity-95" />;
}

export default function Home() {
  return (
    <>
      <JsonLd data={homeLd()} />
      {/* FAQPage mirrors the visible FAQ below (same homeFaq.items source). */}
      <JsonLd data={faqLd(homeFaq.items)} />
      <Hero />
      <ValueProps />
      <Seam />
      <EcosystemBento />
      <Seam />
      <TopProducts />
      {/* PoweredBy is a full poster band that frames itself — no seam either side */}
      <PoweredBy />
      {/* <SocialProof /> */}
      <Testimonials />
      <Seam />
      <Faq />
      <FinalCta />
    </>
  );
}
