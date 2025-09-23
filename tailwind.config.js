import PrimeUI from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
    './src/styles/tailwind.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [PrimeUI],
}

