import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "selector",
  theme: {
    screens: {
      sm: "580px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      jost: ["jsot", "sans-serif"],
      vazir: ["vazir", "sans-serif"],
    },

    keyframes: {
      fadeUp: {
        from: { transform: "translateY(60px)", opacity: "0.2" },
        to: { transform: "translateY(0)", opacity: "1" },
      },
    },
    animation: {
      fadeUp200: "fadeUp 1s linear 0.2s",
      fadeUp400: "fadeUp 1s linear 4s",
      fadeUp600: "fadeUp 1s linear 10s",
    },
    colors: {
      transparent: "transparent",
      dark: "#051036",
      black: "#000",
      white: "#fff",
      darkblue: "#3554d1",
      lightblue: "#A4CAFE",
      myyellow: "#f8d448",
      violet: "#7e53f9",
      lightgreen:"#ebfcea",
      border: "#ddd",
      light: "#697488",
      lighter: "#B0B6C0",
      hoverlight: "#F5F6FD",
      glass: "#ffffff10",
      profile_light:"#f5f5f5",
      profile_dark:"#2E3B61"
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
      spacing: {
        "22": "5.5rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },
      boxShadow: {
        nav: "0 10px 30px 0 rgba(5,16,54,0.31)",
      },
      transitionProperty:{
        "height":"max-height"
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
