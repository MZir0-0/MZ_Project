/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fbfbf8',
        ink: '#0f1720',
        muted: '#6d7c8d',
        line: '#d8ddd9',
        card: '#f0f1ed',
        badge: '#2c9964',
      },
      fontFamily: {
        sans: ['"Open Runde"', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', { lineHeight: '1', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        card: '22px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 32, 0.04), 0 8px 24px rgba(15, 23, 32, 0.04)',
      },
      maxWidth: {
        layout: '1220px',
      },
    },
  },
  plugins: [],
}
