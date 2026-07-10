import { useState } from "react";
import type { Page } from "../types/page";
import { NAV_LINKS } from "../data/navigation";

export default function Nav({
  current,
  go,
}: {
  current: Page;
  go: (p: Page) => void;
}) {
  const [open, setOpen] = useState(false);

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
