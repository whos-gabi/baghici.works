"use client";

import { ShowcaseOrg, ShowcaseRepo } from "@/lib/github";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HeroCard } from "./hero-card";
import { ContactBar } from "./contact-bar";
import { PhilosophyCard } from "./philosophy-card";
import { ProjectsGrid } from "./projects-grid";
import { OrgsGrid } from "./orgs-grid";
import { ServicesCard } from "./services-card";

type BentoGridProps = {
  repos: ShowcaseRepo[];
  orgs: ShowcaseOrg[];
  className?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export function BentoGrid({ repos, orgs, className }: BentoGridProps) {
  return (
    <section className={cn("container py-12 md:py-16", className)}>
      <div className="mb-6 flex">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
          Builder&apos;s Hub · Baghici Works
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={cardVariants}
          className="md:col-span-4"
          layout
        >
          <HeroCard />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="md:col-span-2"
          layout
        >
          <ServicesCard />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="md:col-span-4"
          layout
        >
          <ProjectsGrid repos={repos} orgs={orgs} />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="md:col-span-2"
          layout
        >
          <PhilosophyCard />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="md:col-span-6"
          layout
        >
          <OrgsGrid orgs={orgs} />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="md:col-span-6"
          layout
        >
          <ContactBar />
        </motion.div>
      </motion.div>
    </section>
  );
}

