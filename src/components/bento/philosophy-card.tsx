import { Lightbulb } from "lucide-react";
import { BentoCard } from "./card-shell";

type PhilosophyCardProps = {
  className?: string;
};

export function PhilosophyCard({ className }: PhilosophyCardProps) {
  return (
    <BentoCard className={className}>
      <div className="flex h-full flex-col justify-between gap-4 p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent">
            <Lightbulb className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-white">The Philosophy</p>
        </div>
        <p className="text-sm text-white/70">
          &quot;Code is leverage. I focus on building systems that scale,
          emphasizing clean architecture, security, and user-centric design
          patterns.&quot;
        </p>
      </div>
    </BentoCard>
  );
}

