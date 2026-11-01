import type { MetadataRoute } from "next";

// Brand assets live in public/brand/rajmudra (Rajmudra logo kit). Keep icon
// paths pointed there so the manifest, favicon, and header all draw from one
// place.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rajmudra Media",
    short_name: "Rajmudra",
    description:
      "Run bookings, payments, events, and communities on systems you own.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e7",
    theme_color: "#fe5100",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/rajmudra/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/rajmudra/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/rajmudra/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
