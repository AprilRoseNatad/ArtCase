import LandingLayout from "@/layouts/LandingLayout";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import About from "@/components/landing/About";
import FAQ from "@/components/landing/FAQ";

export default function Landing() {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <div id="hero" className="h-full w-full snap-start snap-always">
        <Hero />
      </div>

      {/* Features Section */}
      <div id="features" className="min-h-full w-full snap-start snap-always">
        <Features />
      </div>

      {/* About Section Target */}
      <div id="about" className="min-h-full w-full snap-start snap-always">
        <About />
      </div>

      {/* FAQ Section Target */}
      <div id="faq" className="min-h-full w-full snap-start snap-always">
        <FAQ />
      </div>
    </LandingLayout>
  );
}