import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // warna mengikuti tema (lihat variabel --c-* di globals.css)
        forest: "rgb(var(--c-forest) / <alpha-value>)",
        sage: "rgb(var(--c-sage) / <alpha-value>)",
        leaf: "rgb(var(--c-leaf) / <alpha-value>)",
        beige: "rgb(var(--c-beige) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        deep: "rgb(var(--c-deep) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        charcoal: "#111111",
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(6deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        pulseRing: "pulseRing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
