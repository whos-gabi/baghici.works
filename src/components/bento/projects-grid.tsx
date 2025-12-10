"use client";
import { type ShowcaseOrg, type ShowcaseRepo } from "@/lib/github";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Code2, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BentoCard } from "./card-shell";

type ProjectsGridProps = {
  repos: ShowcaseRepo[];
  orgs: ShowcaseOrg[]; // kept for signature compatibility but not used in this card
  className?: string;
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Solidity: "#3c3c3d",
  Rust: "#b7410e",
  Go: "#00add8",
  Dart: "#00b4ab",
};

function getLanguageColor(language?: string | null) {
  if (!language) return "#9ca3af";
  return languageColors[language] || "#9ca3af";
}

const topicColors = [
  "bg-accent/20 text-accent border-accent/40",
  "bg-accent2/20 text-accent2 border-accent2/40",
  "bg-white/10 text-white border-white/20",
  "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
  "bg-amber-500/15 text-amber-200 border-amber-400/30",
];

export function ProjectsGrid({ repos, className }: ProjectsGridProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleRepos = expanded ? repos.slice(0, 40) : repos.slice(0, 10);

  return (
    <BentoCard className={cn("p-6 md:p-8", className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">Shipments</p>
          <p className="text-xs text-white/60">
            Active builds from my GitHub footprint
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
          Live build-time sync
        </div>
      </div>
      {repos.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-sm text-white/60">
          No public repositories found for this user/org scope.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleRepos.map((repo) => (
            <div
              key={repo.id}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  <p className="text-sm font-semibold text-white">
                    {repo.name}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                  <Star className="h-3.5 w-3.5" />
                  {repo.stars}
                </div>
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/50">
                {repo.owner}
              </p>
              {repo.topics.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {repo.topics.map((topic, idx) => (
                    <span
                      key={`${repo.id}-${topic}`}
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                        topicColors[idx % topicColors.length],
                      )}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
              {repo.description && (
                <p className="mt-2 text-xs text-white/60">{repo.description}</p>
              )}
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={repo.url}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:border-accent/50 hover:text-accent"
                >
                  <Code2 className="h-4 w-4" />
                  View Code
                </Link>
                {repo.homepage ? (
                  <Link
                    href={repo.homepage}
                    className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:border-accent/60 hover:bg-accent/20"
                  >
                    Live
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          ))}

        </div>
      )}

      {repos.length > 10 && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-white/20 hover:bg-white/10"
          >
            {expanded ? "Show top 10" : "Show more (up to 40)"}
            <ArrowUpRight
              className={cn(
                "h-4 w-4 transition-transform",
                expanded ? "rotate-45" : "rotate-135 -scale-y-100",
              )}
            />
          </button>
        </div>
      )}
    </BentoCard>
  );
}

