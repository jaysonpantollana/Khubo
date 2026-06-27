/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#17294F',
          hover: '#1e366a',
          light: '#2a4a8a',
        },
        accent: '#2252D6',
        khubo: {
          bg: '#F9F9F9',
          footer: '#F7F7F7',
          border: '#ebebeb',
          'border-dark': '#dddddd',
        },
      },
      borderRadius: {
        'card': '1rem',
        'pill': '9999px',
        'modal': '1.5rem',
      },
    },
  },
  plugins: [],
};
