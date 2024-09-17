/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "primary-btn": "linear-gradient(to right, var(--tw-gradient-stops))",
      },
      gradientColorStops: {
        "primary-start": "#FBBF24",
        "primary-end": "#9333EA",
      },
    },
  },
  plugins: [],
};