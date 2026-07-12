import { motion } from "motion/react";
import type { Page } from "../types/page";
import { NAV_LINKS } from "../data/navigation";
import StarField from "../components/StarField";
import SectionLabel from "../components/SectionLabel";

export default function HomePage({ go }: { go: (p: Page) => void }) {
  return (
    <div className="relative min-h-screen bg-[#080f1e] flex flex-col items-center justify-center overflow-hidden">
      <StarField count={200} />

      {/* Constellation decoration */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.18 }}
      >
        {/* Left constellation */}
        {[
          [8, 18], [18, 28], [12, 38], [28, 32], [22, 48],
        ].map(([x, y], i, arr) =>
          i < arr.length - 1 ? (
            <line
              key={`ll-${i}`}
              x1={`${x}%`} y1={`${y}%`}
              x2={`${arr[i + 1][0]}%`} y2={`${arr[i + 1][1]}%`}
              stroke="white" strokeWidth="0.5"
            />
          ) : null
        )}
        {[[8,18],[18,28],[12,38],[28,32],[22,48]].map(([x, y], i) => (
          <circle key={`lc-${i}`} cx={`${x}%`} cy={`${y}%`} r="2" fill="white" opacity="0.9" />
        ))}
        {/* Right constellation */}
        {[
          [72, 12], [82, 22], [76, 32], [88, 38], [80, 50],
        ].map(([x, y], i, arr) =>
          i < arr.length - 1 ? (
            <line
              key={`rl-${i}`}
              x1={`${x}%`} y1={`${y}%`}
              x2={`${arr[i + 1][0]}%`} y2={`${arr[i + 1][1]}%`}
              stroke="white" strokeWidth="0.5"
            />
          ) : null
        )}
        {[[72,12],[82,22],[76,32],[88,38],[80,50]].map(([x, y], i) => (
          <circle key={`rc-${i}`} cx={`${x}%`} cy={`${y}%`} r="2" fill="white" opacity="0.9" />
        ))}
        {/* Bottom constellation */}
        {[[20,78],[35,72],[50,80],[62,68],[75,76]].map(([x, y], i, arr) =>
          i < arr.length - 1 ? (
            <line
              key={`bl-${i}`}
              x1={`${x}%`} y1={`${y}%`}
              x2={`${arr[i+1][0]}%`} y2={`${arr[i+1][1]}%`}
              stroke="white" strokeWidth="0.5"
            />
          ) : null
        )}
        {[[20,78],[35,72],[50,80],[62,68],[75,76]].map(([x, y], i) => (
          <circle key={`bc-${i}`} cx={`${x}%`} cy={`${y}%`} r="1.5" fill="white" opacity="0.7" />
        ))}
      </svg>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(107,140,174,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <SectionLabel>Est. June 2026</SectionLabel>

        <h1
          className="text-white text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
        >
          Welcome to<br />
          <em className="text-[#A8C5DE]">Darion & Lani</em>
        </h1>

        <p className="text-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          A collection of our memories, adventures,
          <br className="hidden sm:block" /> and everything still to come.
        </p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => window.open("https://photos.app.goo.gl/rp1BDPz3cuDeYLxN7", "_blank")}
          className="inline-flex items-center gap-3 bg-[#6B8CAE] hover:bg-[#7D9DBF] text-white px-10 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition-colors shadow-2xl shadow-[#6B8CAE]/25"
        >
          Photo Album
          <span className="opacity-70">→</span>
        </motion.button>

        <div className="mt-16 grid grid-cols-4 gap-6 max-w-sm mx-auto">
          {NAV_LINKS.slice(0, 4).map((l) => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className="text-white/25 hover:text-white/70 text-xs tracking-widest uppercase transition-colors leading-tight"
            >
              {l.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080f1e] to-transparent pointer-events-none" />
    </div>
  );
}


// ─── PAGE: ACHIEVEMENTS ───────────────────────────────────────────────────────
