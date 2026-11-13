// Central site config. Swap URLs when real assets land.
export const site = {
  name: "Rajmudra Media",
  url: "https://rajmudramedia.com",
  demoUrl: "https://rajmudramedia.com/book-a-demo",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://rajmudramedia.com/book-a-demo",
  tagline: "Build on systems you control forever",
  contact: {
    email: "namaskar@rajmudramedia.com",
    phone: "+91 79041 09359",
    whatsappDigits: "917904109359",
    city: "Nagpur",
    region: "Maharashtra, India",
    // Machine-readable address for LocalBusiness schema (office: Eureka CoWorking).
    streetAddress: "2nd & 4th floor, 11, Friends Colony, Mate Square, Pratap Nagar Road, Kotwal Nagar",
    addressRegion: "Maharashtra",
    postalCode: "440022",
    geo: { lat: 21.1215218, lng: 79.0567245 },
    responseTime: "Within 1 business day",
    hours: "Mon–Sat · 10:00–19:00 IST",
    // Machine-readable twin of `hours` for schema.org openingHours. Edit both together.
    openingHours: "Mo-Sa 10:00-19:00",
  },
  social: {
    twitter: "#",
    linkedin: "https://www.linkedin.com/company/timewheel-internet/",
    instagram: "https://www.instagram.com/timewheelinternet/",
    youtube: "#",
    google: "https://share.google/kQgyhTXcE8bGbd8Jt",
  },
};
