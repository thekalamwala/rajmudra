import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { bas } from "@/lib/meeticulous";
import { BasHero } from "@/components/meeticulous/hero";
import { BasProblem } from "@/components/meeticulous/problem";
import { BasAutomation } from "@/components/meeticulous/automation";
import { BasBeforeAfter } from "@/components/meeticulous/before-after";
import { BasCapabilities } from "@/components/meeticulous/capabilities";
import { BasFaq } from "@/components/meeticulous/faq";
import { BasProcess } from "@/components/meeticulous/process";
import { BasFinalCta } from "@/components/meeticulous/final-cta";
import { BasFeatures } from "@/components/meeticulous/features";
import { BasIntegrations } from "@/components/meeticulous/integrations";
import { BasPricing } from "@/components/meeticulous/pricing";
import { BasTestimonials } from "@/components/meeticulous/testimonials";

// Title set here (not from lib copy) to keep the site-wide ", Rajmudra" suffix
// and avoid the em-dash in the lib string.
const META_TITLE = "Meeticulous: Appointment Booking & Scheduling Software";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: bas.meta.description,
  ...social({ path: "/products/meeticulous", title: META_TITLE, description: bas.meta.description }),
  alternates: { canonical: "/products/meeticulous" },
};

const PAGE_URL = "https://timewheel.co.in/products/meeticulous";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${PAGE_URL}#software`,
      name: "Meeticulous",
      url: bas.liveUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: bas.meta.description,
      author: {
        "@type": "Organization",
        name: "Rajmudra",
        url: "https://timewheel.co.in",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "0",
        highPrice: "3650",
        offerCount: bas.pricing.plans.length,
      },
      // AggregateRating removed: no verifiable individual reviews back it
      // (Google review-snippet policy). Restore with real Review markup when
      // genuine reviews exist. ponytail: rating stays as visual copy only.
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: bas.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function BookASlothPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BasHero />
      <BasProblem />
      <BasFeatures />
      <BasIntegrations />
      <BasProcess />
      <BasAutomation />
      <BasBeforeAfter />
      <BasPricing />
      <BasCapabilities />
      <BasTestimonials />
      <BasFaq />
      <BasFinalCta />
    </>
  );
}