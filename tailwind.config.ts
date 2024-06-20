import type { Config } from "tailwindcss";

// plugins은 base layer와 utilities layer와 components layer를 확장하는 것이다.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require("@tailwindcss/forms")],
};
export default config;
