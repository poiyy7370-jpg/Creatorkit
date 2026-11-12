import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: { DEFAULT: "#4f46e5", soft: "#eef2ff", violet: "#7c3aed" } } } },
  plugins: [],
} satisfies Config;
