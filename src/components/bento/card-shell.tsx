import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
};

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] shadow-inner-card backdrop-blur-xl transition duration-300 hover:border-white/10 hover:bg-white/[0.06]",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-70 before:pointer-events-none",
        className,
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
      <div className="pointer-events-none absolute inset-[1px] rounded-[22px] border border-white/5" />
    </div>
  );
}

