import { motion } from "framer-motion";
import { Award, Tag, Trophy, Users, MessageSquare } from "lucide-react";

const FEATURES = [
  {
    icon: Trophy,
    title: "Join Official Contests",
    description: "Enter challenges hosted by verified organizers and evaluated by official curators.",
  },
  {
    icon: Tag,
    title: "Filter by Art Style",
    description: "Browse and enter contests tailored to your preferred categories, tags, and themes.",
  },
  {
    icon: Award,
    title: "Earn Badges & Awards",
    description: "Collect digital badges and achievements on your profile for participating or winning.",
  },
  {
    icon: Users,
    title: "Connect with Groups",
    description: "Join or invite friends to artist groups using quick codes or direct links.",
  },
  {
    icon: MessageSquare,
    title: "Chat & Follow Creators",
    description: "Follow your favorite artists and direct message participants, hosts, or curators.",
  },
];

export default function Features() {
  return (
    <section
      className="relative z-20 flex min-h-screen w-full flex-col justify-center bg-[#1D4ED8] text-white -mt-12 pt-28 pb-24 px-6 snap-start overflow-hidden"
    >
      {/* Wave Bleed & Ambient Top Transition */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 overflow-hidden z-0">
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.15, 1],
            x: ["-10%", "5%", "-10%"],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-20 h-96 w-[60%] rounded-full bg-gradient-to-b from-[#00E5FF]/40 via-[#008CFF]/30 to-transparent blur-3xl"
        />

        <motion.div
          animate={{
            opacity: [0.35, 0.6, 0.35],
            scale: [1.1, 1, 1.1],
            x: ["10%", "-5%", "10%"],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -top-24 -right-20 h-96 w-[60%] rounded-full bg-gradient-to-b from-[#3D5AFE]/40 via-[#1D4ED8]/20 to-transparent blur-3xl"
        />

        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1D4ED8] via-[#1D4ED8]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Section Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            What You Can Do
          </h2>
          <p className="mt-4 text-lg text-blue-100/90">
            Features that you can find and experience within the app.
          </p>
        </div>

        {/* Dynamic Responsive Layout: 3 cards top row, 2 centered bottom row */}
        <div className="flex flex-wrap justify-center gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/20"
              >
                <div className="inline-flex items-center justify-center rounded-xl bg-white/20 p-3 text-white ring-1 ring-white/30 mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-50/80 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}