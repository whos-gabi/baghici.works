"use client";

import { cn } from "@/lib/utils";
import { Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BentoCard } from "./card-shell";

type ContactBarProps = {
  className?: string;
};

const whatsappLink = "https://wa.me/40730792946";
const email = "gabibaghici1@gmail.com";
const githubProfile = "https://github.com/whos-gabi";
const instagramProfile = "https://instagram.com/whos_gabi_";
const linkedinProfile = "https://www.linkedin.com/in/baghici";

export function ContactBar({ className }: ContactBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy email", error);
    }
  };

  return (
    <BentoCard
      className={cn(
        "p-6 md:p-8 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-transparent",
        className,
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Direct Access</p>
          <p className="text-xs text-white/60">
            Reach me instantly—shipping mindset, no friction.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={whatsappLink}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:border-accent/70 hover:bg-accent/25"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </Link>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
          >
            <Mail className="h-4 w-4" />
            {copied ? "Copied!" : email}
          </button>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/70">
            <Link
              href={githubProfile}
              className="rounded-full p-1 transition hover:text-white hover:opacity-100"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={instagramProfile}
              className="rounded-full p-1 transition hover:text-white hover:opacity-100"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href={linkedinProfile}
              className="rounded-full p-1 transition hover:text-white hover:opacity-100"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

