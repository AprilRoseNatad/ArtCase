import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How are contest entries evaluated and judged?",
    answer:
      "Submissions are evaluated based on fixed, transparent scoring criteria predefined by the contest organizers. Curators submit weighted ratings, which are then processed automatically to ensure objective results.",
  },
  {
    question: "What file formats and image dimensions are accepted?",
    answer:
      "Accepted formats and dimension limits depend on individual contest specifications. You can view precise file size, resolution, and format constraints on each contest's overview page before submitting.",
  },
  {
    question: "Is ArtCase free for participants and artists?",
    answer:
      "Yes, joining ArtCase, participating in public competitions, interacting with other creators, and displaying achievements on your profile are completely free.",
  },
  {
    question: "How do group codes and team invitations work?",
    answer:
      "Organizers or artists can generate unique group invite codes or share direct links to instantly bring members into custom artist groups or private contest rooms.",
  },
  {
    question: "Can I review scoring distributions after a contest ends?",
    answer:
      "Yes. Once winners are finalized, full evaluation breakdowns and category score distributions are publicly accessible to maintain transparency across all participants.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6 py-16 md:px-12 lg:px-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Title Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="text-sm font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Got Questions?
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-xs backdrop-blur-md transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-hidden"
                >
                  <span className="pr-4 text-base font-semibold text-foreground sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-violet-600 transition-transform duration-300 dark:text-violet-400 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-border/40 px-6 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Transition Wave Background SVG */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 right-0 h-full w-full"
        >
          {/* Underlying Blue Accent Wave */}
          <path
            d="M 1000 1000 L 1000 50 C 600 350, 200 650, 0 800 L 0 1000 Z"
            className="fill-indigo-600 opacity-60 dark:fill-indigo-700"
          />
          {/* Main Violet Wave - Spans full width at the bottom (0,1000 to 1000,1000) for seamless CTA connection */}
          <path
            d="M 1000 1000 L 1000 100 C 650 450, 250 720, 0 880 L 0 1000 Z"
            className="fill-violet-600 dark:fill-violet-700"
          />
        </svg>
      </div>
    </section>
  );
}