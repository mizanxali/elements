import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cat: {
          alkali: '#ff6b6b',
          alkaline: '#ffa94d',
          transition: '#ffd43b',
          posttransition: '#a9e34b',
          metalloid: '#63e6be',
          nonmetal: '#4dabf7',
          noble: '#b197fc',
          lanthanide: '#f783ac',
          actinide: '#e599f7',
          unknown: '#868e96',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
