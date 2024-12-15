/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { maxHeight: '0', opacity: '0', transform: 'translateY(-10px)' },
          '100%': { maxHeight: '300px', opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease forwards',
      },
      fontFamily: {
        notoTC: ['Noto Sans TC', 'sans-serif'],
      }
    },
  },
  plugins: [
  ],
};
