/** @type {import('tailwindcss').Config} */

export default ({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': "#F4E041",
        'secondary-color': "#00BDD3",
        'color-bg': "#F8F8F8",
      },
      fontFamily: {
        'nunito': ['Nunito Sans', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
)