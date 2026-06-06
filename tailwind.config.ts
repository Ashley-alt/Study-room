import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#071526",
          900: "#0b2035",
          800: "#122d46",
        },
        cream: "#fff8e7",
        parchment: "#ead9b7",
        gold: "#d8a84e",
        ember: "#b8743d",
        walnut: "#5b3d2e",
        moss: "#7f8f6a",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 48px rgba(216, 168, 78, 0.28)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "0.82", transform: "scaleY(1)" },
          "45%": { opacity: "1", transform: "scaleY(1.12)" },
          "70%": { opacity: "0.72", transform: "scaleY(0.92)" },
        },
        steam: {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.8)" },
          "45%": { opacity: "0.75" },
          "100%": { opacity: "0", transform: "translateY(-36px) scale(1.18)" },
        },
        rain: {
          "0%": { transform: "translateY(-18px)" },
          "100%": { transform: "translateY(70px)" },
        },
      },
      animation: {
        flicker: "flicker 2.4s ease-in-out infinite",
        steam: "steam 3.8s ease-in-out infinite",
        rain: "rain 0.9s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
