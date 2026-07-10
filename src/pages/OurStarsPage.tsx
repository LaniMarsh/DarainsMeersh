import { useState } from "react";
import { motion } from "motion/react";
import { CONST_EDGES, MEMORY_STARS } from "../data/stars";
import StarField from "../components/StarField";
import SectionLabel from "../components/SectionLabel";

export default function OurStarsPage() {
  const [active, setActive] = useState<(typeof MEMORY_STARS)[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#060d1c] flex flex-col">
      {/* Header */}
      <div className="relative pt-32 pb-10 text-center overflow-hidden">
        <StarField count={80} />
        <div className="relative z-10">
          <SectionLabel>Our Constellation</SectionLabel>
          <h2
            className="text-white text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Stars
          </h2>
          <p className="text-white/35 text-sm mt-4">
            Click a star to unlock a memory
          </p>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative flex-1 min-h-[480px] md:min-h-[560px]">
        <StarField count={150} />

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
          {CONST_EDGES.map(([ai, bi], i) => {
            const sa = MEMORY_STARS[ai];
            const sb = MEMORY_STARS[bi];
            return (
              <line
                key={i}
                x1={`${sa.x}%`}
                y1={`${sa.y}%`}
                x2={`${sb.x}%`}
                y2={`${sb.y}%`}
                stroke="rgba(168,197,222,0.22)"
                strokeWidth="0.7"
                strokeDasharray="4 6"
              />
            );
          })}
        </svg>

        {/* Clickable stars */}
        {MEMORY_STARS.map((s) => {
          const isActive = active?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(isActive ? null : s)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              {/* Glow ring */}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-[#C9A96E]/30 scale-[3] animate-ping" />
              )}
              <span
                className={`relative block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-4 h-4 bg-[#C9A96E] shadow-lg shadow-[#C9A96E]/50"
                    : "w-2.5 h-2.5 bg-white/80 group-hover:w-3.5 group-hover:h-3.5 group-hover:bg-[#A8C5DE]"
                }`}
              />
              <span
                className={`absolute left-1/2 -translate-x-1/2 -top-6 text-[9px] whitespace-nowrap font-medium transition-opacity tracking-wide ${
                  isActive
                    ? "text-[#C9A96E] opacity-100"
                    : "text-white/60 opacity-0 group-hover:opacity-100"
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}

        {/* Memory card */}
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0d1b38]/95 backdrop-blur-md border border-white/15 rounded-2xl p-6 w-80 max-w-[calc(100vw-3rem)] shadow-2xl"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.25em] uppercase mb-2">
              {active.label}
            </p>
            <p className="text-white/80 text-sm leading-relaxed">{active.memory}</p>
            <button
              onClick={() => setActive(null)}
              className="mt-4 text-white/25 hover:text-white/60 text-xs transition-colors"
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </div>

      {/* Zodiac section */}
      <div className="bg-[#0a1428] border-t border-white/8 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>Astrologically Speaking</SectionLabel>
          <div className="flex flex-col md:flex-row items-center justify-center gap-14 mt-8">
            <div className="text-center">
              <div className="text-5xl mb-3 text-white/90">♏</div>
              <p className="text-white font-medium">Scorpio</p>
              <p className="text-white/35 text-xs mt-1 tracking-wide">
                Passionate · Loyal · Intense
              </p>
            </div>
            <div className="text-[#C9A96E] text-3xl font-light">×</div>
            <div className="text-center">
              <div className="text-5xl mb-3 text-white/90">♓</div>
              <p className="text-white font-medium">Pisces</p>
              <p className="text-white/35 text-xs mt-1 tracking-wide">
                Dreamy · Intuitive · Romantic
              </p>
            </div>
          </div>

          <div className="mt-10 bg-white/5 rounded-2xl p-7 border border-white/8 max-w-xl mx-auto">
            <p className="text-white/65 text-sm leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Scorpio and Pisces form one of the deepest bonds in the zodiac
              — built on shared feeling, unspoken understanding, and a love
              that grows more layered with every passing season."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: RELATIONSHIP WRAPPED ───────────────────────────────────────────────
