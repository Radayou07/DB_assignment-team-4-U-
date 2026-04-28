// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: '#faf9fa',
        surface: '#faf9fa',
        'on-surface': '#1b1c1d',
        'on-surface-variant': '#434653',
        'primary-container': '#3366cc',
        primary: '#094cb2',
        error: '#ba1a1a',
        outline: '#737784',
        'surface-variant': '#e3e2e3',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Noto Serif', 'serif'],
        headline: ['Noto Serif', 'serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Public Sans', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['30px', { lineHeight: '38px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-md': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'label-caps': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
        'body-base': ['14px', { lineHeight: '20px' }],
        'body-sm': ['13px', { lineHeight: '18px' }],
      },
    },
  },
  plugins: [],
}