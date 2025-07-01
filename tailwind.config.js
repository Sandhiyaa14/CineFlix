/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        primary: '#7B4DFF',
        background: '#0A0E21',
        text: '#E0E0E0',
        accent: '#4A0E4E',
        secondary: '#1F2041',
        highlight: '#C04CFD',
        button: '#7e30cf',
        link: '#A06CD5',
        border: '#2D3250',
        hover: '#8F7DC6',
      },
      screens: {
        'xs': '450px',
      },
    },
  },
  plugins: [],
}

