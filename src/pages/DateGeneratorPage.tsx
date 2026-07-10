import { useState } from "react";
import { motion } from "motion/react";
import { DATE_IDEAS } from "../data/dateIdeas";
import StarField from "../components/StarField";
import SectionLabel from "../components/SectionLabel";

export default function DateGeneratorPage() {
  const [idea, setIdea] = useState<(typeof DATE_IDEAS)[0] | null>(null);
  const [spinning, setSpinning] = useState(false);

  function generate() {
    setSpinning(true);
    setIdea(null);
    setTimeout(() => {
      setIdea(DATE_IDEAS[Math.floor(Math.random() * DATE_IDEAS.length)]);
      setSpinning(false);
    }, 650);
  }

  return (
    <div className="relative min-h-screen bg-[#0a1428] pt-28 pb-28 flex items-center justify-center overflow-hidden">
      <StarField count={70} />
      <div className="relative z-10 max-w-2xl w-full mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SectionLabel>Stuck for ideas?</SectionLabel>
          <h2
            className="text-white text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Date Night Generator
          </h2>
          <p className="text-white/55 text-sm mb-12 max-w-xs mx-auto">
            Press the button. See where the night takes you.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={generate}
            disabled={spinning}
            className="bg-[#6B8CAE] hover:bg-[#7D9DBF] disabled:opacity-60 text-white px-12 py-5 rounded-full text-xs tracking-[0.25em] uppercase font-medium shadow-xl shadow-[#6B8CAE]/25 transition-colors mb-14"
          >
            {spinning ? "✨  Conjuring..." : "Generate Our Next Date  ✦"}
          </motion.button>

          {idea && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55 }}
              className="bg-white/8 rounded-3xl p-10 shadow-lg border border-white/12 text-left"
            >
              <div className="text-6xl text-center mb-5">{idea.emoji}</div>
              <p className="text-center text-[#6B8CAE] text-xs tracking-widest uppercase mb-4">
                {idea.vibe}
              </p>
              <h3
                className="text-white text-2xl text-center mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {idea.title}
              </h3>
              <p className="text-white/55 leading-relaxed text-center text-sm">
                {idea.description}
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={generate}
                  className="text-[#6B8CAE] hover:text-white text-sm transition-colors"
                >
                  Try another →
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── PAGE: OUR STARS ──────────────────────────────────────────────────────────
