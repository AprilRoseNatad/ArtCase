import type { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useEffect, } from "react";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="min-h-screen w-full bg-[#e8e8e8]">
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}