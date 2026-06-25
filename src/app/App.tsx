import { useState, useMemo } from "react";
import { motion } from "motion/react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Page =
  | "home"
  | "achievements"
  | "date"
  | "stars"
  | "wrapped"
  | "bucket"
  | "escape";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Achievements", page: "achievements" },
  { label: "Date Night", page: "date" },
  { label: "Our Stars", page: "stars" },
  { label: "Wrapped", page: "wrapped" },
  { label: "Bucket List", page: "bucket" },
  { label: "Escape Room", page: "escape" },
];

const DATE_IDEAS = [
  {
    title: "Midnight Stargazing Picnic",
    description:
      "Pack your favorite snacks, a warm blanket, and your best playlist. Find a quiet hill and count the stars until 2am.",
    emoji: "🌙",
    vibe: "Romantic · Outdoors",
  },
  {
    title: "Cooking a New Cuisine Together",
    description:
      "Pick a country neither of you has cooked from. Shop for ingredients, put on a playlist, and embrace the chaos.",
    emoji: "👨‍🍳",
    vibe: "Home · Cozy",
  },
  {
    title: "Spontaneous Road Trip",
    description:
      "Set the alarm early, grab coffee to go, and drive somewhere new. No GPS — just instinct and good music.",
    emoji: "🚗",
    vibe: "Adventure · Spontaneous",
  },
  {
    title: "Bookshop Scavenger Hunt",
    description:
      "Each choose 3 books for the other based on secret clues. Read the first chapter together that evening.",
    emoji: "📚",
    vibe: "Cozy · Creative",
  },
  {
    title: "Home Spa Evening",
    description:
      "Face masks, candles, a movie you've been saving, and absolutely no obligations the next morning.",
    emoji: "🕯️",
    vibe: "Cozy · Home",
  },
  {
    title: "Mini Golf Championship",
    description:
      "Whoever loses buys dessert. Play-by-play commentary required. Document every near-miss in excruciating detail.",
    emoji: "⛳",
    vibe: "Fun · Playful",
  },
  {
    title: "Farmer's Market Morning",
    description:
      "Go early, sample everything shamelessly, buy something strange, and cook it together for dinner.",
    emoji: "🌸",
    vibe: "Morning · Casual",
  },
  {
    title: "Build Something Together",
    description:
      "A puzzle, a piece of furniture, a terrarium — anything that results in something you made together.",
    emoji: "🔨",
    vibe: "Creative · Teamwork",
  },
  {
    title: "Sunset Boat Ride",
    description:
      "Rent a kayak or find a ferry. Watch the city shift colors as the sun drops below the water.",
    emoji: "🚣",
    vibe: "Romantic · Water",
  },
  {
    title: "Drive-In Movie Night",
    description:
      "Find the nearest drive-in, bring terrible snacks, argue lovingly about the movie choice. Classic.",
    emoji: "🎬",
    vibe: "Nostalgic · Fun",
  },
];

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "First Date",
    desc: "The adventure officially began",
    icon: "✨",
    unlocked: true,
    date: "March 15, 2023",
    rarity: "Legendary",
  },
  {
    id: 2,
    title: "First 'I Love You'",
    desc: "Three words that changed everything",
    icon: "💛",
    unlocked: true,
    date: "May 2, 2023",
    rarity: "Legendary",
  },
  {
    id: 3,
    title: "Survived a Road Trip",
    desc: "Together in a small car for 8+ hours",
    icon: "🗺️",
    unlocked: true,
    date: "June 2023",
    rarity: "Rare",
  },
  {
    id: 4,
    title: "Met the Family",
    desc: "Big dinners, bigger nerves, pure love",
    icon: "🏡",
    unlocked: true,
    date: "July 2023",
    rarity: "Epic",
  },
  {
    id: 5,
    title: "First Fight, First Fix",
    desc: "Got through it and came out stronger",
    icon: "🤝",
    unlocked: true,
    date: "August 2023",
    rarity: "Rare",
  },
  {
    id: 6,
    title: "One Year Together",
    desc: "365 days of choosing each other",
    icon: "🎂",
    unlocked: true,
    date: "March 15, 2024",
    rarity: "Legendary",
  },
  {
    id: 7,
    title: "Cooked a Full Dinner",
    desc: "Nobody got hurt. One dish was magnificent.",
    icon: "🍝",
    unlocked: true,
    date: "October 2023",
    rarity: "Common",
  },
  {
    id: 8,
    title: "International Adventure",
    desc: "A stamp in the passport, a memory forever",
    icon: "✈️",
    unlocked: false,
    date: "Coming Soon",
    rarity: "Epic",
  },
  {
    id: 9,
    title: "Dance in the Rain",
    desc: "Spontaneous, drenched, totally worth it",
    icon: "🌧️",
    unlocked: false,
    date: "???",
    rarity: "Rare",
  },
  {
    id: 10,
    title: "Build a Home Together",
    desc: "A space that is fully, undeniably ours",
    icon: "🏠",
    unlocked: false,
    date: "???",
    rarity: "Legendary",
  },
];

const RARITY_GRAD: Record<string, string> = {
  Legendary: "from-yellow-400 to-amber-500",
  Epic: "from-purple-400 to-violet-600",
  Rare: "from-sky-400 to-blue-500",
  Common: "from-emerald-400 to-green-500",
};

const RARITY_BADGE: Record<string, string> = {
  Legendary: "bg-yellow-400/15 text-yellow-300",
  Epic: "bg-purple-400/15 text-purple-300",
  Rare: "bg-sky-400/15 text-sky-300",
  Common: "bg-emerald-400/15 text-emerald-300",
};

const MEMORY_STARS = [
  {
    id: 1,
    x: 14,
    y: 22,
    label: "First Date",
    memory:
      "The little Italian place where we talked until they turned the lights off on us.",
  },
  {
    id: 2,
    x: 37,
    y: 13,
    label: "The Road Trip",
    memory:
      "Lost three times, sang every song twice, wouldn't change a single wrong turn.",
  },
  {
    id: 3,
    x: 58,
    y: 30,
    label: "I Love You",
    memory: "You said it first. I was scared and then I wasn't.",
  },
  {
    id: 4,
    x: 76,
    y: 17,
    label: "Christmas Together",
    memory:
      "Matching pajamas, your mom's recipe, snow outside the window.",
  },
  {
    id: 5,
    x: 83,
    y: 42,
    label: "Our Song",
    memory:
      "The one that came on at exactly the right moment. We knew immediately.",
  },
  {
    id: 6,
    x: 27,
    y: 50,
    label: "The Beach",
    memory: "Sunrise, coffee, and absolutely nowhere to be.",
  },
  {
    id: 7,
    x: 52,
    y: 60,
    label: "One Year",
    memory:
      "How did we get here so fast? I hope the next one goes slower.",
  },
  {
    id: 8,
    x: 68,
    y: 72,
    label: "First Apartment",
    memory:
      "Boxes everywhere. Your terrible furniture assembly. The best pizza we ever ordered.",
  },
  {
    id: 9,
    x: 21,
    y: 74,
    label: "Late Night Talks",
    memory:
      "3am conversations that became the things we know best about each other.",
  },
  {
    id: 10,
    x: 88,
    y: 78,
    label: "The Future",
    memory: "Everything we haven't done yet. I can't wait for all of it.",
  },
];

const CONST_EDGES = [
  [0, 1],
  [1, 2],
  [2, 4],
  [4, 3],
  [2, 6],
  [6, 5],
  [6, 7],
  [7, 8],
  [6, 9],
];

const BUCKET: Record<string, { text: string; done: boolean }[]> = {
  Travel: [
    { text: "See the Northern Lights", done: false },
    { text: "Road trip across the country", done: true },
    { text: "Weekend in Kyoto", done: false },
    { text: "Italian countryside villa", done: false },
    { text: "Camping in Patagonia", done: false },
  ],
  Adventures: [
    { text: "Take a dance class together", done: false },
    { text: "Learn to surf", done: false },
    { text: "Hike a 14er", done: true },
    { text: "Go skydiving", done: false },
    { text: "White water rafting", done: true },
  ],
  Food: [
    { text: "Tasting menu at a Michelin star", done: false },
    { text: "Cook through Julia Child", done: false },
    { text: "Night market food tour", done: false },
    { text: "Take a pasta-making class", done: false },
    { text: "Grow our own vegetables", done: false },
  ],
  Home: [
    { text: "Host a dinner party for 8", done: true },
    { text: "Keep a plant alive for 6 months", done: false },
    { text: "Build something with our hands", done: false },
    { text: "Create a reading nook", done: false },
    { text: "Sunday farmers market ritual", done: true },
  ],
  Moments: [
    { text: "Slow dance with no occasion", done: false },
    { text: "Write letters to open in 10 years", done: false },
    { text: "Watch every Kubrick film", done: false },
    { text: "Stay up for a meteor shower", done: true },
    { text: "Learn each other's love languages", done: true },
  ],
};

const ESCAPE_CLUES = [
  {
    id: 1,
    title: "The Beginning",
    riddle:
      'Where did we go on our very first date? (type the type of restaurant — one word)',
    answer: "italian",
    hint: "Think candlelight and pasta...",
  },
  {
    id: 2,
    title: "Our Song",
    riddle: "What is the first word of our song?",
    answer: "always",
    hint: "The one that played on the drive home.",
  },
  {
    id: 3,
    title: "The City",
    riddle: "What city did we visit for your birthday trip?",
    answer: "paris",
    hint: "City of light, city of us.",
  },
  {
    id: 4,
    title: "The Promise",
    riddle:
      'What two words do I always say before I fall asleep? (no punctuation)',
    answer: "love you",
    hint: "Said every single night without fail.",
  },
];

const WRAPPED_STATS = [
  {
    label: "Miles Traveled",
    value: "2,847",
    sub: "miles together",
    grad: "from-[#3B5FA0] to-[#1a2744]",
    emoji: "✈️",
  },
  {
    label: "Hours Together",
    value: "4,320+",
    sub: "and counting",
    grad: "from-[#9E4A63] to-[#6B2140]",
    emoji: "⏱️",
  },
  {
    label: "Favorite Restaurant",
    value: "Osteria",
    sub: "visited 14 times",
    grad: "from-[#B87333] to-[#7B4A1A]",
    emoji: "🍝",
  },
  {
    label: "Favorite Memory",
    value: "Beach Sunrise",
    sub: "June 2023",
    grad: "from-[#3A8C7C] to-[#1F5C52]",
    emoji: "🌅",
  },
  {
    label: "Funniest Moment",
    value: "Tent Incident",
    sub: "camping, summer 2023",
    grad: "from-[#7B5BAE] to-[#4A2F7E]",
    emoji: "😂",
  },
  {
    label: "Most Used Phrase",
    value: '"You okay?"',
    sub: "said with love, always",
    grad: "from-[#4E8E4E] to-[#2A5C2A]",
    emoji: "💬",
  },
];


// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function StarField({ count = 120 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        delay: Math.random() * 5,
        dur: 2 + Math.random() * 4,
        opacity: 0.25 + Math.random() * 0.65,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-medium">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6 mb-0" />;
}

function Nav({
  current,
  go,
}: {
  current: Page;
  go: (p: Page) => void;
}) {
  const [open, setOpen] = useState(false);
  const dark = ["home", "stars", "escape", "achievements"].includes(current);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#0d1b38]/80 border-b border-white/8 text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => { go("home"); setOpen(false); }}
          className="font-serif text-lg font-semibold tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Darion & Lani <span className="text-[#C9A96E]">✦</span>
        </button>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7 text-xs tracking-widest uppercase font-medium">
          {NAV_LINKS.map((l) => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`transition-opacity hover:opacity-100 ${
                current === l.page ? "opacity-100" : "opacity-45"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 w-6 py-1"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-px rounded-full bg-white transition-all ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-px rounded-full bg-white transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px rounded-full bg-white transition-all ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d1b38]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4 text-sm">
            {NAV_LINKS.map((l) => (
              <button
                key={l.page}
                onClick={() => { go(l.page); setOpen(false); }}
                className={`text-left transition-opacity hover:opacity-100 ${
                  current === l.page ? "opacity-100 font-medium" : "opacity-50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a1428] text-white/40 text-center py-12 text-sm border-t border-white/5">
      <p className="text-white/70 text-base">Made with ❤️ just for you.</p>
      <p className="mt-2 text-xs opacity-50">Darion & Lani · Est. 2026</p>
    </footer>
  );
}

// ─── PAGE: HOME ───────────────────────────────────────────────────────────────

function HomePage({ go }: { go: (p: Page) => void }) {
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
          onClick={() => go("achievements")}
          className="inline-flex items-center gap-3 bg-[#6B8CAE] hover:bg-[#7D9DBF] text-white px-10 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition-colors shadow-2xl shadow-[#6B8CAE]/25"
        >
          Begin Exploring
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

function AchievementsPage() {
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

function DateGeneratorPage() {
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

function OurStarsPage() {
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

function RelationshipWrappedPage() {
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

function FutureBucketListPage() {
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

function EscapeRoomPage() {
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

export default function App() {
  const [page, setPage] = useState<Page>("home");

  function go(p: Page) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.5); }
        }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>

      <Nav current={page} go={go} />

      <main>
        {page === "home" && <HomePage go={go} />}
        {page === "achievements" && <AchievementsPage />}
        {page === "date" && <DateGeneratorPage />}
        {page === "stars" && <OurStarsPage />}
        {page === "wrapped" && <RelationshipWrappedPage />}
        {page === "bucket" && <FutureBucketListPage />}
        {page === "escape" && <EscapeRoomPage />}
      </main>

      <Footer />
    </>
  );
}
