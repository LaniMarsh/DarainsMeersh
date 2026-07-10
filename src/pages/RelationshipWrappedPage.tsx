import { motion } from "motion/react";
import { WRAPPED_STATS } from "../data/wrappedStats";
import StarField from "../components/StarField";
import SectionLabel from "../components/SectionLabel";

export default function RelationshipWrappedPage() {
  return (
    <div className="relative min-h-screen bg-[#0a1428] pt-28 pb-28 overflow-hidden">
      <StarField count={70} />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <SectionLabel>Year in Review</SectionLabel>
          <h2
            className="text-white text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Relationship{" "}
            <em className="text-[#6B8CAE]">Wrapped</em>
          </h2>
          <p className="text-white/55 text-sm mt-4">
            Everything we've been, in numbers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WRAPPED_STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-gradient-to-br ${s.grad} rounded-3xl p-8 overflow-hidden`}
            >
              <div className="text-3xl mb-6">{s.emoji}</div>
              <p className="text-white/55 text-[10px] tracking-[0.3em] uppercase mb-2">
                {s.label}
              </p>
              <p
                className="text-white text-3xl font-bold mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.value}
              </p>
              <p className="text-white/50 text-xs">{s.sub}</p>
              <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-white/8" />
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/4" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 relative rounded-3xl bg-[#0d1b38] p-12 text-center overflow-hidden border border-white/8"
        >
          <StarField count={35} />
          <div className="relative z-10">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-5">
              In Summary
            </p>
            <p
              className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              "Another year of choosing each other. Of morning coffee and late
              nights. Of inside jokes that need no explanation. Here's to
              more."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── PAGE: BUCKET LIST ────────────────────────────────────────────────────────
