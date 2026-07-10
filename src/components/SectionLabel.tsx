import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-medium">
      {children}
    </p>
  );
}
