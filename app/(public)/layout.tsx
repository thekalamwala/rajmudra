import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { ButtonGlow } from "@/components/button-glow";
import { ScrollRefresh } from "@/components/anim/scroll-refresh";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollRefresh />
      <ButtonGlow />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}