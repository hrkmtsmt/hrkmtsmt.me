import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      base: "#101010",
      primary: "#2F76E6",
      black: "#202020",
      white: "#F1F1F1",
    },
    fontFamily: {
      "qualion-regular": [
        '"QualionRound-Regular"',
        '"Helvetica Neue"',
        "Arial",
        '"Hiragino Kaku Gothic ProN"',
        '"Hiragino Sans"',
        "Meiryo",
        "sans-serif",
      ],
      "qualion-bold": [
        '"QualionRound-Bold"',
        '"Helvetica Neue"',
        "Arial",
        '"Hiragino Kaku Gothic ProN"',
        '"Hiragino Sans"',
        "Meiryo",
        "sans-serif",
      ],
      default: [
        '"JetBrains Mono"',
        '"Gen Jyuu Gothic Monospace"',
        "monospace",
        '"Helvetica Neue"',
        "Arial",
        '"Hiragino Kaku Gothic ProN"',
        '"Hiragino Sans"',
        "Meiryo",
        "sans-serif",
      ],
    },
  },
  plugins: [],
} satisfies Config;
