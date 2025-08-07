/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
      colors: {
        brand: {
          50: '#f2f6ff',
          100: '#e6edff',
          200: '#c5d5ff',
          300: '#9fb9ff',
          400: '#6f93ff',
          500: '#3f6dff',
          600: '#2e52db',
          700: '#223db0',
          800: '#1b328e',
          900: '#16286f',
        },
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
}