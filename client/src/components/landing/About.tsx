import { motion } from "framer-motion";
import { Check, Lightbulb } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const SOLUTIONS = [
  "Enforces predefined contest guidelines, fixed submission deadlines, and clear category classifications.",
  "Provides structured, weighted scoring criteria to ensure objective and consistent judging.",
  "Establishes precise submission requirements, including accepted art mediums, image dimensions, and file formats.",
  "Maintains complete evaluation transparency, allowing participants to review scoring distributions and results.",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 min-h-screen w-full flex flex-col justify-center items-center bg-background py-12 px-6 md:px-12 lg:px-20 overflow-hidden scroll-mt-12"
    >
      <div className="mx-auto max-w-6xl w-full my-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            About ArtCase
          </span>
        </motion.div>

        {/* Big Centered Header */}
        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl max-w-4xl mx-auto leading-tight"
        >
          ArtCase is a web-based platform built to bring structure, transparency, and fairness to digital art competitions.
        </motion.h2>

        {/* Two-Column Layout */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 items-stretch">
          {/* Left Column: The Problem */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex flex-col justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-blue-600/10 p-6 md:p-8 border-l-4 border-indigo-600 dark:border-indigo-400 shadow-sm"
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground">The Problem</h3>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-foreground/80">
              Participating in digital art contests hosted on standard social platforms often presents significant operational challenges. Unstructured submission threads, ambiguous rules, and subjective judging standards create uncertainty for participants. Artists devote considerable effort to their submissions without clear insights into evaluation criteria or assurance that rules are uniformly applied to all entrants.
            </p>
          </motion.div>

          {/* Right Column: How ArtCase Solves It */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Header with Yellow Light Bulb */}
            <div className="flex items-center gap-2.5">
              <Lightbulb className="h-6 w-6 md:h-7 md:w-7 text-amber-500 fill-amber-400/30 shrink-0" />
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                How ArtCase Solves It
              </h3>
            </div>

            <ul className="mt-4 md:mt-6 space-y-3">
              {SOLUTIONS.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-xl p-1.5 transition-colors hover:bg-muted/40"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-foreground leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}