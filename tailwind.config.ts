import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fb',
          100: '#c5d5f4',
          500: '#1a3c6e',
          600: '#15336a',
          700: '#0f2a5f',
          DEFAULT: '#1a3c6e',
        },
        secondary: {
          500: '#2e7d32',
          600: '#256b29',
          DEFAULT: '#2e7d32',
        },
        accent: '#f59e0b',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
