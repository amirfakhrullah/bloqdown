module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
}
