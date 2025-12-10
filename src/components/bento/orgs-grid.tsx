"use client";

import { ShowcaseOrg } from "@/lib/github";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Code2, Star } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BentoCard } from "./card-shell";

type OrgsGridProps = {
  orgs: ShowcaseOrg[];
  className?: string;
};

const topicColors = [
  "bg-accent/20 text-accent border-accent/40",
  "bg-accent2/20 text-accent2 border-accent2/40",
  "bg-white/10 text-white border-white/20",
  "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
  "bg-amber-500/15 text-amber-200 border-amber-400/30",
];

export function OrgsGrid({ orgs, className }: OrgsGridProps) {
  const [expandedOrgs, setExpandedOrgs] = useState<Record<number, boolean>>({});
  const [showDetails, setShowDetails] = useState(false);

  const compactOrgs = useMemo(() => orgs.slice(0, 12), [orgs]);

  if (orgs.length === 0) return null;

  return (
    <BentoCard className={cn("p-6 md:p-8", className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">Organizations</p>
          <p className="text-xs text-white/60">
            Admin orgs and their public workstreams
          </p>
        </div>
      </div>

      {!showDetails ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {compactOrgs.map((org) => (
              <div
                key={org.id}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <span
                      className="inline-block h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${org.avatarUrl})` }}
                      role="img"
                      aria-label={org.login}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-white">
                      {org.login}
                    </p>
                    {org.description ? (
                      <p className="text-[11px] text-white/60 line-clamp-2">
                        {org.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Link
                  href={org.url}
                  className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs text-accent transition hover:underline hover:underline-offset-4"
                >
                  View organization
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {orgs.slice(0, 10).map((org) => {
          const repos = org.repos || [];
          const expanded = expandedOrgs[org.id] ?? false;
          const shownRepos = expanded ? repos : repos.slice(0, 3);

          return (
            <div
              key={org.id}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                  <span
                    className="inline-block h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${org.avatarUrl})` }}
                    role="img"
                    aria-label={org.login}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-white">
                    {org.login}
                  </p>
                  <Link
                    href={org.url}
                    className="inline-flex w-fit items-center gap-1.5 text-xs text-accent transition hover:underline hover:underline-offset-4"
                  >
                    View organization
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {repos.length === 0 ? (
                <p className="mt-3 text-xs text-white/60">
                  No public repositories in this org.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {shownRepos.map((repo) => (
                    <div
                      key={repo.id}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor: repo.language
                                ? undefined
                                : "#9ca3af",
                            }}
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
                      {repo.topics.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {repo.topics.map((topic, tidx) => (
                            <span
                              key={`${repo.id}-${topic}`}
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                                topicColors[tidx % topicColors.length],
                              )}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                      {repo.description && (
                        <p className="mt-1 text-xs text-white/60">
                          {repo.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-2">
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

              {repos.length > 3 && (
                <button
                  type="button"
                  onClick={() =>
                    setExpandedOrgs((prev) => ({
                      ...prev,
                      [org.id]: !expanded,
                    }))
                  }
                  className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-white/70 transition hover:text-white"
                >
                  {expanded ? "Show less" : "Show more"}
                  <ArrowUpRight
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      expanded ? "rotate-45" : "rotate-135 -scale-y-100",
                    )}
                  />
                </button>
              )}
            </div>
          );
          })}
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-white/20 hover:bg-white/10"
        >
          {showDetails ? "Collapse org details" : "Expand org details"}
          <ArrowUpRight
            className={cn(
              "h-4 w-4 transition-transform",
              showDetails ? "rotate-45" : "rotate-135 -scale-y-100",
            )}
          />
        </button>
      </div>
    </BentoCard>
  );
}

