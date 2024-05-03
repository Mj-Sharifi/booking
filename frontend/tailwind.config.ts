import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      "sm": "580px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      jost: ["Jost"],
      Sevillana: ["Sevillana"],
    },
    keyframes: {
      fadeUp: {
        from: { transform: "translateY(10%)", opacity: "0.2" },
        to: { transform: "translateY(0)", opacity: "1" },
      },
      downup: { from: { height: "auto" }, to: { height: "0px" } },
    },
    animation: { fadeUp: "fadeUp 0.5s ease", downup: "downup 0.3s" },
    colors: {
      transparent: "transparent",
      dark: "#051036",
      black: "#000",
      white: "#fff",
      darkblue: "#3554d1",
      yellow: "#f8d448",
      border: "#ddd",
      light: "#697488",
      hoverlight: "rgba(53, 84, 209, .05) !important",
      glass: "#ffffff10",
    },
    boxShadow: {
      nav: "0 10px 30px 0 rgba(5,16,54,0.31)",
    },
    extend: {
      height: {
        "22": "5.5rem",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "100": "100",
        "1000": "1000",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
