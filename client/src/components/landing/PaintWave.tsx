import { motion, useScroll, useTransform } from "framer-motion";

export default function PaintWave() {
  const { scrollYProgress } = useScroll();

  // Subtle upward drift
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -25]);
  // Slight vertical stretch anchored to the bottom to prevent gaps
  const scaleY = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);

  const wave1 =
    "M0 330 C120 180 280 450 440 270 C600 100 760 430 920 250 C1080 90 1260 400 1440 220 V1200 H0 Z";

  const wave2 =
    "M0 520 C130 650 280 250 440 470 C600 650 760 180 920 450 C1080 650 1270 220 1440 480 V1200 H0 Z";

  const wave3 =
    "M0 230 C130 80 280 430 440 190 C600 20 760 390 920 170 C1080 30 1270 350 1440 150 V1200 H0 Z";

  return (
    <motion.div
      style={{ y, scaleY }}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] min-h-[260px] max-h-[420px] overflow-hidden z-10 origin-bottom"
    >
      <motion.svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        /* -bottom-10 extends the path fill under the viewport frame */
        className="absolute -bottom-10 -left-[10%] h-[125%] w-[120%]"
        animate={{
          rotate: [-1, 1, -1],
          scaleX: [1, 1.03, 1],
          x: ["-0.5%", "0.5%", "-0.5%"],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="paint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="25%" stopColor="#2563EB" />
            <stop offset="55%" stopColor="#4338CA" />
            <stop offset="80%" stopColor="#3B0764" />
            <stop offset="100%" stopColor="#2E1065" />
          </linearGradient>

          <linearGradient id="depth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="25%" stopColor="#1D4ED8" />
            <stop offset="55%" stopColor="#3730A3" />
            <stop offset="80%" stopColor="#311053" />
            <stop offset="100%" stopColor="#2E1065" />
          </linearGradient>
        </defs>

        <motion.path
          fill="#0284C7"
          fillOpacity=".2"
          d={wave1}
          animate={{ d: [wave1, wave2, wave3, wave1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.path
          fill="url(#paint)"
          d={wave1}
          animate={{ d: [wave1, wave2, wave3, wave1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.path
          fill="url(#depth)"
          d={wave2}
          animate={{ d: [wave2, wave3, wave1, wave2] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.div>
  );
}