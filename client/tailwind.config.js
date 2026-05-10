/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fraunces': ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        'jakarta': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        cream: '#faf6ed',
        ink: {
          900: '#15151b',
          950: '#0a0a0e',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
}