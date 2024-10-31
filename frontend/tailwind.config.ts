import opacity from "react-element-popper/animations/opacity";
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
      fadeInUp: {
        from: { transform: "translateY(100%)",opacity:"0" },
        to: { transform: "translateY(0)", opacity: "1",},
      },
      fadeOutDown: {
        from:  { opacity:"1" },
        to:{ transform: "translateY(100%)", opacity: "0" },
      },
    },
    animation: {
      fadeInUp: "fadeInUp 0.5s linear 0s ",
      fadeInDown:"fadeOutDown 0.5s linear 0s forwards"
    },
    extend: {
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
        "18":"4.5rem",
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
      },
      listStyleImage:{
        "checkmark":'url("/assets/images/check-regular-16.png")',
        "xmark":"url('/assets/images/x-regular-16.png')"
      },
      backgroundImage:{
        "auth":"url('/assets/images/auth.jpg')"
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
