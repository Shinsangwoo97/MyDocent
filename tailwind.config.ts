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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom-1': '0px 2px 6px 0px #8247E24D',
        'custom-2': '0px 1px 0px 0px #FFFFFF80 inset',
      },
    },
  },
  plugins: [],
};
export default config;
