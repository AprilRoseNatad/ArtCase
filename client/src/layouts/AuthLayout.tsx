import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artcaseLogo from "@/assets/images/artcaseLogo.png";
import { Sparkles, Palette, Trophy } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  maxWidth?: string;
}

export function AuthLayout({ children, maxWidth = "max-w-4xl" }: AuthLayoutProps) {
  const is5xl = maxWidth === "max-w-5xl";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Ambient background glow elements */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/15 blur-[120px]" />

      <div className={`relative flex w-full ${maxWidth} overflow-hidden rounded-3xl border border-border bg-card/60 shadow-2xl backdrop-blur-xl transition-all duration-300`}>
        
        {/* Left Creative Showcase Panel */}
        <div className={`relative hidden ${is5xl ? "lg:w-[45%]" : "lg:w-1/2"} flex-col justify-between border-r border-border/50 bg-gradient-to-br from-violet-950/20 via-background to-indigo-950/20 p-10 lg:flex`}>
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={artcaseLogo} alt="ArtCase Logo" className="h-9 w-auto" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                ArtCase
              </span>
            </Link>

            <div className="mt-12 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-400"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Join the Creator Ecosystem
              </motion.div>

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                Where Digital Art Meets Recognition.
              </h1>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Enter competitions, build your portfolio, or host curated contests for artists around the globe.
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5 rounded-2xl bg-card/40 p-3.5 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground">Showcase Your Work</h4>
                <p className="text-[11px] text-muted-foreground">Submit high-res digital assets & get feedback.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl bg-card/40 p-3.5 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground">Fair & Transparent Judging</h4>
                <p className="text-[11px] text-muted-foreground">Ecosystem verified by curated judges.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className={`w-full p-8 sm:p-10 ${is5xl ? "lg:w-[55%]" : "lg:w-1/2"}`}>
          {/* Mobile Header */}
          <div className="mb-6 text-center lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={artcaseLogo} alt="ArtCase Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold tracking-tight text-foreground">ArtCase</span>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}