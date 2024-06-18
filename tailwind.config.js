/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#345261',
      },
      fontFamily:{
        poppins:["Poppins"]
      },
    },
    
  },
  variants: {},
  plugins: [],
}