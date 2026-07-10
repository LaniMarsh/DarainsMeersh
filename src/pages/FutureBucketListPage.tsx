import { useState } from "react";
import { motion } from "motion/react";
import { BUCKET } from "../data/bucket";
import StarField from "../components/StarField";
import SectionLabel from "../components/SectionLabel";

export default function FutureBucketListPage() {
  const [tab, setTab] = useState("Travel");
  const [checked, setChecked] = useState<Set<string>>(
    new Set(
      Object.entries(BUCKET).flatMap(([cat, items]) =>
        items.filter((it) => it.done).map((it) => `${cat}::${it.text}`)
      )
    )
  );

  const allItems = Object.values(BUCKET).flat();
  const total = allItems.length;
  const done = checked.size;

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  return (
    <div className="relative min-h-screen bg-[#0a1428] pt-28 pb-28 overflow-hidden">
      <StarField count={70} />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <SectionLabel>Dreams We'll Share</SectionLabel>
          <h2
            className="text-white text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Future Bucket List
          </h2>

          <div className="mt-8 max-w-xs mx-auto">
            <div className="flex justify-between text-white/55 text-xs mb-2">
              <span>{done} completed</span>
              <span>{total - done} remaining</span>
            </div>
            <div className="h-1.5 bg-white/12 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(done / total) * 100}%` }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#6B8CAE] to-[#8FAF8A]"
              />
            </div>
          </div>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {Object.keys(BUCKET).map((cat) => (
            <button
              key={cat}
              onClick={() => setTab(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                tab === cat
                  ? "bg-[#6B8CAE] text-white shadow-md"
                  : "bg-white/8 text-white/70 border border-white/12 hover:border-white/22"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {BUCKET[tab].map((item, i) => {
            const key = `${tab}::${item.text}`;
            const isDone = checked.has(key);
            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => toggle(key)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border cursor-pointer transition-all duration-200 select-none ${
                  isDone
                    ? "bg-[#8FAF8A]/14 border-[#8FAF8A]/35"
                    : "bg-white/5 border-white/12 hover:border-[#6B8CAE]/40 hover:bg-white/8"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isDone
                      ? "bg-[#8FAF8A] border-[#8FAF8A]"
                      : "border-white/22"
                  }`}
                >
                  {isDone && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm transition-all ${
                    isDone
                      ? "line-through text-white/40"
                      : "text-white"
                  }`}
                >
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: ESCAPE ROOM ────────────────────────────────────────────────────────
