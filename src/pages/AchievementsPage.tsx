import { motion } from "motion/react";
import { ACHIEVEMENTS, RARITY_BADGE, RARITY_GRAD } from "../data/achievements";
import StarField from "../components/StarField";
import SectionLabel from "../components/SectionLabel";

export default function AchievementsPage() {
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  const pct = Math.round((unlocked / ACHIEVEMENTS.length) * 100);

  return (
    <div className="relative min-h-screen bg-[#0a1428] overflow-hidden pt-28 pb-28">
      <StarField count={80} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <SectionLabel>Player Stats</SectionLabel>
          <h2
            className="text-white text-4xl md:text-5xl mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Achievements
          </h2>

          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-white/40 text-xs mb-2">
              <span>{unlocked} unlocked</span>
              <span>{ACHIEVEMENTS.length - unlocked} remaining</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#6B8CAE] to-[#C9A96E]"
              />
            </div>
            <p className="text-white/30 text-xs mt-2">{pct}% Relationship Progress</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={`relative rounded-2xl p-5 border transition-all duration-200 ${
                a.unlocked
                  ? "bg-white/7 border-white/14 hover:bg-white/11 hover:border-white/22"
                  : "bg-white/3 border-white/7 opacity-45"
              }`}
            >
              {a.unlocked && (
                <div
                  className={`absolute inset-0 rounded-2xl opacity-8 bg-gradient-to-br ${RARITY_GRAD[a.rarity]}`}
                />
              )}

              <div className="relative">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3 ${
                    a.unlocked
                      ? `bg-gradient-to-br ${RARITY_GRAD[a.rarity]}`
                      : "bg-white/8"
                  }`}
                >
                  {a.unlocked ? a.icon : "🔒"}
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${RARITY_BADGE[a.rarity]}`}
                >
                  {a.rarity}
                </span>
                <h3 className="text-white text-sm font-medium mt-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-white/38 text-xs mt-1 leading-snug">{a.desc}</p>
                {a.unlocked && (
                  <p className="text-[#C9A96E] text-xs mt-2 opacity-80">{a.date}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: DATE GENERATOR ─────────────────────────────────────────────────────
