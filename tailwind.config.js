module.exports = {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}', // 让 Tailwind 扫描 React 文件
  ],
  theme: {
    extend: {
      fontFamily: {
        notoTC: ['Noto Sans TC', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
