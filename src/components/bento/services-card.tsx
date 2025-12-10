import { cn } from "@/lib/utils";
import { Brain, Cpu, Infinity, Smartphone } from "lucide-react";
import { BentoCard } from "./card-shell";

const services = [
  {
    title: "Web Engineering",
    description: "High-performance SaaS platforms.",
    tags: ["React", "Node.js", "Next.js", "PostgreSQL"],
    icon: Infinity,
  },
  {
    title: "Decentralized Tech",
    description: "Smart Contracts & DApps on Ethereum.",
    tags: ["Solidity", "Web3.js"],
    icon: Cpu,
  },
  {
    title: "Mobile Solutions",
    description: "Native-feel cross-platform apps.",
    tags: ["React Native", "Flutter"],
    icon: Smartphone,
  },
  {
    title: "AI Integration",
    description: "MLOps pipelines and intelligent agents.",
    tags: ["Python", "TensorFlow"],
    icon: Brain,
  },
];

type ServicesCardProps = {
  className?: string;
};

export function ServicesCard({ className }: ServicesCardProps) {
  return (
    <BentoCard className={cn("p-6 md:p-8", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/60">
            Engineering Capabilities
          </p>
          <p className="mt-1 text-xs text-white/50">
            What I build and the stacks I deploy.
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {service.title}
                    </p>
                    <p className="text-xs text-white/60">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 transition group-hover:border-accent/40 group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
}

