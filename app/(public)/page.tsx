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
import { WaveDivider } from "@/components/desi";
import { JsonLd } from "@/components/json-ld";
import { homeLd, faqLd } from "@/lib/jsonld";
import { homeFaq } from "@/lib/home-faq";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: site.url } };

// A quiet seam between two sections (never mid-section) — a single wave line
// with a central flower, in place of the louder festive temple-arch band.
function Seam() {
  return <WaveDivider className="mx-auto my-6 w-full max-w-5xl px-6" />;
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
