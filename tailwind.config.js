/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'scarlet-gum': {
        '50': '#f5edf7', 
        '100': '#ecdff0', 
        '200': '#ceb2d9', 
        '300': '#b088bf', 
        '400': '#774791', 
        '500': '#431a60', 
        '600': '#391557', 
        '700': '#2c0e47', 
        '800': '#20093b', 
        '900': '#15052b', 
        '950': '#0c021c'
      }
    },
    extend: {},
  },
  plugins: [],
}