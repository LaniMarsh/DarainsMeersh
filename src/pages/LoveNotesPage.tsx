import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import StarField from "../components/StarField";
import SectionLabel from "../components/SectionLabel";

import { LOVE_REASONS, type LoveReason } from "../data/loveReasons";

export default function LoveNotesPage() {
  const [selectedReason, setSelectedReason] =
    useState<LoveReason | null>(null);

  const reasonOfTheDay = useMemo(() => {
    const today = new Date();

    const dateNumber =
      today.getFullYear() * 1000 +
      today.getMonth() * 50 +
      today.getDate();

    return LOVE_REASONS[dateNumber % LOVE_REASONS.length];
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070d1c] pb-28 pt-28">
      <StarField count={100} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(201,169,110,0.12), transparent 32%), radial-gradient(circle at 15% 65%, rgba(107,140,174,0.12), transparent 30%), radial-gradient(circle at 85% 72%, rgba(158,74,99,0.1), transparent 28%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <SectionLabel>A Collection of Little Truths</SectionLabel>

          <h1
            className="mb-5 text-4xl text-white md:text-6xl"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Reasons I Love You
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
            Some are big. Some are tiny. Some you probably do not
            even realize. Every single one is true.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative mx-auto mb-16 max-w-3xl overflow-hidden rounded-[2rem] border border-[#C9A96E]/25 bg-white/[0.06] p-7 text-center shadow-2xl backdrop-blur-sm md:p-12"
        >
          <StarField count={30} />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,169,110,0.1), transparent 45%, rgba(107,140,174,0.08))",
            }}
          />

          <div className="relative z-10">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.4em] text-[#C9A96E]">
              I love you because...
            </p>

            <div className="mb-5 text-5xl">
              {reasonOfTheDay.emoji}
            </div>

            <h2
              className="mb-4 text-2xl text-white md:text-3xl"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {reasonOfTheDay.title}
            </h2>

            <p
              className="mx-auto max-w-lg text-base leading-relaxed text-white/65 md:text-lg"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              “{reasonOfTheDay.text}”
            </p>
          </div>
        </motion.section>

        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key="reasons"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {LOVE_REASONS.map((reason, index) => (
                <motion.button
                  key={reason.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.35,
                  }}
                  whileHover={{
                    y: -6,
                    rotate: index % 2 === 0 ? -1 : 1,
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedReason(reason)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-left shadow-lg transition-colors hover:border-[#C9A96E]/35 hover:bg-white/[0.08]"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 100%, rgba(201,169,110,0.15), transparent 55%)",
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                        💌
                      </span>

                      <span className="text-[10px] tracking-widest text-white/25">
                        {String(reason.id).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <p
                        className="text-sm text-white/70 transition-colors group-hover:text-white"
                        style={{
                          fontFamily:
                            "'Playfair Display', serif",
                        }}
                      >
                        Open this note
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      <AnimatePresence>
        {selectedReason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReason(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02050d]/80 p-6 backdrop-blur-md"
          >
            <motion.article
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.88,
                rotateX: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                y: 24,
                scale: 0.92,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 22,
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-[#C9A96E]/30 bg-[#f2e8d5] px-8 py-10 text-center shadow-2xl md:px-12 md:py-14"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(90,70,45,0.13) 0.7px, transparent 0.7px)",
                  backgroundSize: "7px 7px",
                }}
              />

              <div className="pointer-events-none absolute left-5 top-5 text-[#9b7544]/25">
                ✦
              </div>

              <div className="pointer-events-none absolute bottom-5 right-5 text-[#9b7544]/25">
                ✦
              </div>

              <button
                onClick={() => setSelectedReason(null)}
                aria-label="Close note"
                className="absolute right-5 top-4 z-20 text-xl text-[#5d4935]/35 transition-colors hover:text-[#5d4935]"
              >
                ×
              </button>

              <div className="relative z-10">
                <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.35em] text-[#9b7544]">
                  Reason {selectedReason.id}
                </p>

                <div className="mb-5 text-5xl">
                  {selectedReason.emoji}
                </div>

                <h2
                  className="mb-6 text-2xl text-[#34271d] md:text-3xl"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {selectedReason.title}
                </h2>

                <div className="mx-auto mb-6 h-px w-12 bg-[#9b7544]/45" />

                <p
                  className="text-lg leading-relaxed text-[#4f3b2c] md:text-xl"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                  }}
                >
                  “{selectedReason.text}”
                </p>

                <p
                  className="mt-9 text-base text-[#9b7544]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  — Lani
                </p>

                <button
                  onClick={() => setSelectedReason(null)}
                  className="mt-8 text-xs uppercase tracking-[0.22em] text-[#5d4935]/45 transition-colors hover:text-[#5d4935]"
                >
                  Fold note
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}