import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily:{
      "jost":["Jost"],
      "Sevillana":["Sevillana"]
    },
    colors:{
      transparent:"transparent",
      dark:"#051036",
      black:"#000",
      white:"#fff",
      darkblue:"#3554d1",
      yellow:"#f8d448",
      border:"#ddd",
      light:"#697488"
    },
    boxShadow:{
      "nav":"0 10px 30px 0 rgba(5,16,54,0.31)",
    },
    extend: {
      height: {
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
