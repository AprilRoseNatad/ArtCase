interface PaintLoaderProps {
  size?: number;
  className?: string;
}

export function PaintLoader({ size = 36, className = "" }: PaintLoaderProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <style>{`
        /* Whole Ring Rotation: Rapid turn -> Pause (35%-60%) -> Resume */
        @keyframes ringSpin {
          0% {
            transform: rotate(0deg);
          }
          35% {
            transform: rotate(180deg);
          }
          60% {
            transform: rotate(180deg); /* Rotation Pause */
          }
          95%, 100% {
            transform: rotate(360deg);
          }
        }

        /* 
           Continuous Fluid Size Wave:
           Transitions between clear base size (5px) and peak swell (9.5px).
           During 35%-60% (pause), the flow slows to a gentle crawl.
        */
        @keyframes fluidSizeLoop {
          0% {
            r: 5px;
            transform: scale(0.85); /* Increased minimum size floor */
          }
          20% {
            r: 9.5px;
            transform: scale(1.25); /* Peak Big */
          }
          /* --- PAUSE WINDOW (35% -> 60%) --- */
          /* Slowed flow rate during rotation pause */
          35% {
            r: 8px;
            transform: scale(1.1);
          }
          60% {
            r: 6.8px;
            transform: scale(0.95); /* Crawns slowly through pause */
          }
          /* --------------------------------- */
          80%, 100% {
            r: 5px;
            transform: scale(0.85); /* Back to base clear size */
          }
        }

        .animate-paint-spin {
          animation: ringSpin 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          transform-origin: center;
        }

        .goo-node {
          transform-box: fill-box;
          transform-origin: center;
        }

        /* Staggered delay chain passing the size wave */
        .node-1 { animation: fluidSizeLoop 2.5s ease-in-out infinite 0.00s; }
        .node-2 { animation: fluidSizeLoop 2.5s ease-in-out infinite 0.08s; }
        .node-3 { animation: fluidSizeLoop 2.5s ease-in-out infinite 0.16s; }
        .node-4 { animation: fluidSizeLoop 2.5s ease-in-out infinite 0.24s; }
        .node-5 { animation: fluidSizeLoop 2.5s ease-in-out infinite 0.32s; }
        .node-6 { animation: fluidSizeLoop 2.5s ease-in-out infinite 0.40s; }
        .node-7 { animation: fluidSizeLoop 2.5s ease-in-out infinite 0.48s; }
        .node-8 { animation: fluidSizeLoop 2.5s ease-in-out infinite 0.56s; }
      `}</style>

      <svg
        className="h-full w-full animate-paint-spin"
        viewBox="0 0 100 100"
      >
        <defs>
          {/* Liquid Gooey Filter */}
          <filter id="paint-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 19 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>

          {/* Tail Arc Gradient */}
          <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <g filter="url(#paint-goo)">
          {/* Node 1: Leader (Indigo) */}
          <circle cx="50" cy="16" className="goo-node node-1" fill="#6366f1" />
          
          {/* Nodes 2-3: Upper Body */}
          <circle cx="68" cy="22" className="goo-node node-2" fill="#6366f1" />
          <circle cx="81" cy="37" className="goo-node node-3" fill="#8b5cf6" />
          
          {/* Nodes 4-5: Mid Body */}
          <circle cx="84" cy="55" className="goo-node node-4" fill="#a855f7" />
          <circle cx="75" cy="72" className="goo-node node-5" fill="#a855f7" />
          
          {/* Nodes 6-7: Lower Body */}
          <circle cx="58" cy="82" className="goo-node node-6" fill="#3b82f6" />
          <circle cx="40" cy="81" className="goo-node node-7" fill="#3b82f6" />
          
          {/* Node 8: Tail End */}
          <circle cx="26" cy="70" className="goo-node node-8" fill="#0284c7" />

          {/* Connected Trailing Arc Tail */}
          <path
            d="M 26 70 A 34 34 0 0 1 18 48"
            fill="none"
            stroke="url(#tailGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}