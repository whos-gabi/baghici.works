import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          "2xl": "1200px",
        },
      },
      colors: {
        background: "#0a0a0a",
        foreground: "#e5e7eb",
        card: "#121212",
        border: "#1f1f1f",
        accent: "#a855f7",
        accent2: "#22d3ee",
        muted: "#9ca3af",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(168,85,247,0.24), 0 20px 60px rgba(0,0,0,0.45)",
        "inner-card":
          "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(255,255,255,0.02)",
      },
    },
  },
  plugins: [],
};
export default config;
