import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        "site-bg": "#f8f2e8",
      },
      boxShadow: {
        soft: "0 8px 20px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
