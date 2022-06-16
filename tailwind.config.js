module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster"]
      }
    },
  },
  plugins: [require("daisyui")],
}
