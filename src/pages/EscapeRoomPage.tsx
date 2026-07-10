import { useState } from "react";
import { motion } from "motion/react";
import { ESCAPE_CLUES } from "../data/escapeClues";
import StarField from "../components/StarField";
import SectionLabel from "../components/SectionLabel";

export default function EscapeRoomPage() {
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const allSolved = solved.size === ESCAPE_CLUES.length;

  function attempt(clue: (typeof ESCAPE_CLUES)[0]) {
    const val = (inputs[clue.id] ?? "").trim().toLowerCase();
    if (val === clue.answer) {
      setSolved((prev) => new Set([...prev, clue.id]));
      setErrors((prev) => {
        const n = new Set(prev);
        n.delete(clue.id);
        return n;
      });
    } else {
      setErrors((prev) => new Set([...prev, clue.id]));
      setTimeout(
        () =>
          setErrors((prev) => {
            const n = new Set(prev);
            n.delete(clue.id);
            return n;
          }),
        1400
      );
    }
  }

  return (
    <div className="relative min-h-screen bg-[#070d1c] overflow-hidden pt-28 pb-28">
      <StarField count={70} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <SectionLabel>Can You Remember?</SectionLabel>
          <h2
            className="text-white text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Escape Room
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
            Solve all four clues to unlock the final surprise. Each answer is
            a memory only we share.
          </p>

          {/* Progress dots */}
          <div className="flex gap-3 justify-center mt-8">
            {ESCAPE_CLUES.map((c) => (
              <div
                key={c.id}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  solved.has(c.id)
                    ? "bg-[#C9A96E] scale-110 shadow-md shadow-[#C9A96E]/40"
                    : "bg-white/18"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {ESCAPE_CLUES.map((clue, i) => {
            const isSolved = solved.has(clue.id);
            const hasError = errors.has(clue.id);
            return (
              <motion.div
                key={clue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border transition-all duration-300 ${
                  isSolved
                    ? "bg-[#C9A96E]/10 border-[#C9A96E]/40"
                    : hasError
                    ? "bg-red-500/8 border-red-400/40"
                    : "bg-white/5 border-white/12 hover:border-white/22"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center text-sm font-medium transition-colors ${
                      isSolved
                        ? "bg-[#C9A96E] text-[#0d1b38]"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {isSolved ? "✓" : i + 1}
                  </div>
                  <div>
                    <p className="text-white/35 text-[10px] tracking-[0.25em] uppercase">
                      Clue {i + 1}
                    </p>
                    <h3 className="text-white text-sm font-medium">{clue.title}</h3>
                  </div>
                </div>

                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  {clue.riddle}
                </p>

                {!isSolved ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your answer..."
                      value={inputs[clue.id] ?? ""}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, [clue.id]: e.target.value }))
                      }
                      onKeyDown={(e) => e.key === "Enter" && attempt(clue)}
                      className={`w-full bg-white/8 border rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/18 outline-none focus:border-[#6B8CAE]/60 transition-colors ${
                        hasError
                          ? "border-red-400/55"
                          : "border-white/14"
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-white/22 text-xs">
                        Hint: {clue.hint}
                      </p>
                      <button
                        onClick={() => attempt(clue)}
                        className="text-[#6B8CAE] hover:text-white text-xs transition-colors"
                      >
                        Submit →
                      </button>
                    </div>
                    {hasError && (
                      <p className="text-red-400 text-xs">Not quite — try again ✦</p>
                    )}
                  </div>
                ) : (
                  <p className="text-[#C9A96E] text-xs tracking-widest">✦ Unlocked</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Final prize */}
        <motion.div
          className={`relative rounded-3xl border p-10 text-center transition-all duration-700 overflow-hidden ${
            allSolved
              ? "border-[#C9A96E]/55 bg-[#C9A96E]/8"
              : "border-white/10 bg-white/3"
          }`}
        >
          {allSolved && <StarField count={30} />}
          <div className="relative z-10">
            <div
              className="text-7xl mb-5 transition-all duration-700"
              style={{
                filter: allSolved
                  ? "none"
                  : "grayscale(1) opacity(0.25) blur(2px)",
              }}
            >
              {allSolved ? "💛" : "🔒"}
            </div>

            <h3
              className="text-white text-xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {allSolved ? "You remembered everything." : "One final prize awaits."}
            </h3>

            {allSolved ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/65 text-sm leading-relaxed max-w-md mx-auto"
              >
                You know our story by heart. Every beginning, every memory,
                every quiet promise. That's everything. That's the whole
                prize — you and me, remembering.
                <br />
                <br />
                <span
                  className="text-[#C9A96E]"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                >
                  I love you more than any archive could hold. ✦
                </span>
              </motion.p>
            ) : (
              <p className="text-white/28 text-sm">
                Solve all 4 clues to unlock your surprise.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
