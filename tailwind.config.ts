import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "350px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-white-1": "#F9F9F9",
        "custom-white-2": "rgba(249, 249, 249, 0.2)",
        "custom-red-1": "#D84040",
        "custom-red-2": "#ED6565",
        "custom-red-3": "rgba(216, 64, 64, 0.5)",
        "custom-red-4": "#E55656",
        "custom-black1": "rgba(30, 30, 30, 0.2)",
        "custom-black2": "#1E1E1E",
        "custom-black3": "rgba(0, 0, 0, 0.25)",
        "custom-navy-1": "#213555",
        "custom-gey-1": "#EBEBEB",
        "custom-grey-2": "#D9D9D9",
        "custom-grey-3": "#CACACA",
        "custom-blue-1": "#2971CC",
        "custom-green-1": "#5CB338",
      },
      transitionProperty: {
        "transform-opacity": "transform, opacity",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "80%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "confetti-1": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(500%) rotate(360deg)",
            opacity: "0",
          },
        },
        "confetti-2": {
          "0%": { transform: "translateY(0) rotate(45deg)", opacity: "1" },
          "100%": {
            transform: "translateY(500%) rotate(405deg)",
            opacity: "0",
          },
        },
        "confetti-3": {
          "0%": { transform: "translateY(0) rotate(-30deg)", opacity: "1" },
          "100%": {
            transform: "translateY(500%) rotate(330deg)",
            opacity: "0",
          },
        },
        checkmark: {
          "0%": { strokeDashoffset: "100", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
        "ring-expand": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "pop-in": "pop-in 0.4s ease-out forwards",
        "confetti-1": "confetti-1 1s ease-out forwards",
        "confetti-2": "confetti-2 1.2s ease-out forwards",
        "confetti-3": "confetti-3 0.8s ease-out forwards",
        checkmark: "checkmark 0.6s ease-out forwards",
        "ring-expand": "ring-expand 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
