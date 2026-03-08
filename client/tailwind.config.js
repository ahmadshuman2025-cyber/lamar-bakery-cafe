/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5F0E8",
        secondary: "#8B4513",
        accent: "#D2691E",
        "soft-gold": "#C9A227",
        cream: "#F5F0E8",
        brown: {
          50: "#FDF8F3",
          100: "#FAF0E6",
          200: "#F5E6D3",
          300: "#E8C9A3",
          400: "#D4A76A",
          500: "#8B4513",
          600: "#6B340E",
          700: "#4A2409",
          800: "#2E1505",
          900: "#1A0C02",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Lato", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.1)",
        "soft-hover": "0 8px 30px rgba(0, 0, 0, 0.15)",
        card: "0 4px 20px rgba(139, 69, 19, 0.1)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "slide-in": "slideIn 0.5s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
