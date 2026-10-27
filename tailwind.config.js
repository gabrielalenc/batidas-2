/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        tropical: {
          green: "#173D2B",     // Verde tropical: fundos principais, navbar e footer
          secondary: "#28583D", // Verde secundário: cards, superfícies e variações de fundo
          orange: "#F28B30",    // Laranja vibrante: botões principais, chamadas para ação e destaques
          yellow: "#FFD66B",    // Amarelo solar: detalhes, pequenos realces e elementos decorativos
          cream: "#FFF4DB",     // Creme baunilha: textos sobre fundos escuros e seções claras
          dark: "#243126",      // Texto escuro: textos sobre superfícies claras
        },
      },
      fontFamily: {
        sans: ["var(--font-alpino)", "sans-serif"],
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-left": "slide-left 3s linear infinite",
        "spin-slow": "spin 6s linear infinite",
      },
    },
  },
};