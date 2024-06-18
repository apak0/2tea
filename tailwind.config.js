module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rgb: {
          '0%, 100%': { color: 'rgb(255, 0, 0)' }, // kırmızı
          '33%': { color: 'rgb(0, 255, 0)' },     // yeşil
          '66%': { color: 'rgb(0, 0, 255)' },     // mavi
        },
      },
      animation: {
        rgb: 'rgb 3s linear infinite',
      },
    },
  },
  plugins: [],
};