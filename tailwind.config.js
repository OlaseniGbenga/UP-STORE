/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        KumbhSans: ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        Purple: "#a7449f",
        Orange: "#f27405",
        Blue: "#5f7ebf",
        Yellow: "#f29f05",
        White: "#f2f2f2",
      },

      gridTemplateColumns: {
        shopgrid: "repeat(4, minmax(0, 208px))",
        smallgrid: "repeat(2, minmax(0, 208px))",
        smallestgrid: "repeat(1, minmax(0, 208px))",
        cartgrid: "repeat(1, minmax(0, 340px))",
      },
    },
  },
  plugins: [],
}
