/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: '#ff4d6d',
        soft: '#ffccd5',
        deep: '#590d22',
      }
    },
  },
  plugins: [],
}
