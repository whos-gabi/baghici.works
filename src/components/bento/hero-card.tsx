"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";
import { BentoCard } from "./card-shell";
import { Button } from "../ui/button";

type HeroCardProps = {
  className?: string;
};

const EMAIL = "hello@domain.com";

export function HeroCard({ className }: HeroCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email", error);
    }
  };

  return (
    <BentoCard
      className={cn(
        "bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent",
        "border-white/10 shadow-glow overflow-hidden",
        className,
      )}
    >
      <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-accent/30 via-accent2/20 to-transparent blur-3xl" />
      <div className="absolute right-6 bottom-6 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.14),rgba(34,211,238,0.1),transparent_60%)] blur-2xl opacity-80" />
      <div className="absolute right-16 bottom-8 h-10 w-24 rounded-full border border-white/5 bg-white/5 blur-lg" />

      <div className="relative flex h-full flex-col gap-6 p-8 md:p-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white/10 bg-white/5 md:h-20 md:w-20">
              <Image
                src="/pfp.png"
                alt="Profile"
                width={80}
                height={80}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
            <span className="relative inline-flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            Architecting Digital Ecosystems.
          </h1>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">
            I turn complex ideas into shipping products. Specializing in
            high-performance SaaS, scalable MVPs, and emerging tech integration.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="default"
            className="gap-2 text-sm font-semibold"
            onClick={() => {
              const footer = document.getElementById("footer");
              footer?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start a Project
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="gap-2 text-sm font-semibold border-white/20 text-white hover:bg-white/10"
            onClick={handleCopy}
          >
            Copy Email
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {copied && (
          <div className="absolute right-8 top-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-100 shadow-glow">
            Email copied!
          </div>
        )}
      </div>
    </BentoCard>
  );
}

