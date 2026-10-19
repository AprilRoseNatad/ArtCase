import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import PaintWave from "./PaintWave";

import left1 from "@/assets/images/aria.jpg";
import left2 from "@/assets/images/razeomen.jpg";
import left3 from "@/assets/images/mesweetie.jpg";
import right1 from "@/assets/images/raiden.jpg";
import right2 from "@/assets/images/randomMan.jpg";
import right3 from "@/assets/images/enchanted.jpg";

const WORDS = [
  { text: "Create.", color: "text-violet-600" },
  { text: "Compete.", color: "text-blue-600" },
];

const ARTWORKS = [
  { src: left1, className: "left-15 top-25 w-60 h-30 z-20", baseRotate: -12 },
  { src: left2, className: "left-50 top-70 w-80 h-80 z-30", baseRotate: 8 },
  { src: right3, className: "left-15 top-[27rem] w-60 h-60 z-10 opacity-85", baseRotate: -6 },
  { src: right1, className: "right-15 top-25 w-60 h-60 z-20", baseRotate: 12 },
  { src: right2, className: "right-30 top-70 w-80 h-80 z-30", baseRotate: -8 },
  { src: left3, className: "right-15 top-[27rem] w-52 h-52 z-10 opacity-85", baseRotate: 6 },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: (delay = 0) => ({ duration: 0.8, delay }),
};

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-background">
      {/* Floating Artworks Background */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {ARTWORKS.map((art, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: [0, -(10 + i * 2), 0],
              x: i % 2 === 0 ? [0, 12 + i, 0] : [0, -(12 + i), 0],
              rotate: [
                art.baseRotate,
                art.baseRotate + (i % 2 === 0 ? 3 : -3),
                art.baseRotate,
              ],
            }}
            transition={{
              opacity: { duration: 0.8, delay: i * 0.12 },
              y: { duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 6 + i * 0.6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 7 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className={`absolute ${art.className}`}
          >
            <img
              src={art.src}
              alt=""
              className="h-56 w-56 rounded-3xl object-cover shadow-2xl ring-1 ring-black/20 shadow-[0_25px_60px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.3)] transition-shadow duration-300"
            />
          </motion.div>
        ))}
      </div>

      {/* Hero Content Wrapper */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex h-full items-center justify-center px-6 text-center"
      >
        <div className="max-w-4xl -translate-y-12 pb-16 sm:-translate-y-15">
          {/* Capsule Text Badge */}
          <motion.div
            {...fadeInUp}
            transition={fadeInUp.transition(0.0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-600 backdrop-blur-md dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-violet-500" />
            <span>The Platform for Digital Art Contests</span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            transition={fadeInUp.transition(0.1)}
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <div className="flex flex-col items-center">
              <div className="relative h-[1.15em] w-[10ch] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[index].text}
                    initial={{ y: 70, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -70, opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeInOut" }}
                    className={`absolute inset-0 tracking-[0.1rem] ${WORDS[index].color}`}
                  >
                    {WORDS[index].text}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mt-2 text-primary tracking-[0.1rem]">Get Recognized.</span>
            </div>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={fadeInUp.transition(0.2)}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            ArtCase is a web-based digital arts showcase and recognition platform. <br />
            Be a participant, organizer or curator of art competitions.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            {...fadeInUp}
            transition={fadeInUp.transition(0.3)}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center justify-center opacity-60 rounded-xl border border-black bg-background px-6 py-3.5 font-semibold text-foreground transition-all duration-200 hover:border-indigo-600 hover:text-indigo-600"
            >
              Learn More
            </button>

            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-7 py-3.5 font-semibold text-white shadow-xl transition-all duration-100 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,.45)]"
              >
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
                />
                <span className="relative flex items-center gap-2">
                  Get Started
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <PaintWave />
    </section>
  );
}