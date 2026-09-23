import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "var(--ink)", paper: "var(--paper)", card: "var(--card)", line: "var(--line)", mute: "var(--mute)", blue: "var(--blue)" },
    fontFamily: { display: ["var(--font-display)", "Georgia", "serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
