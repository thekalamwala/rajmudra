"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Recalculate ScrollTrigger positions after every (client-side) navigation and
// once fonts/images settle. On a hard refresh `window.load` handles this, but on
// a soft navigation `load` has already fired, so without this the trigger start
// positions stay stale from the previous page and sections land in the wrong
// place until the next refresh.
export function ScrollRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    // after the new layout has painted
    const raf = requestAnimationFrame(() => requestAnimationFrame(refresh));
    // after web fonts swap in (they change text height → section offsets)
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    // a late catch-all for lazy images
    const t = setTimeout(refresh, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
