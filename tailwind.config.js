/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      opacity: {
        4: '0.04'
      },
      screens: {
        hd: '480px'
      },
      fontSize: {
        small: ['0.75rem', '0.875rem']
      },
      colors: {
        white: '#ffffff',
        'gray-light': '#aab2bd',
        'gray-lighter': '#e8eff4',
        'gray-lightest': '#e6e9ed',
        'gray-50': '#e1e1e6',
        'gray-700': '#29292e',

        blue: 'rgb(91, 165, 212)',
        'light-blue': 'rgba(25, 118, 210)',
        'cyan-500': '#61dafb',
        'blue-100': '#324498',

        green: 'rgb(62, 171, 122)',
        'green-100': '#bccd32',

        yellow: '#ffcc00',
        'yellow-580': '#eba417',

        orange: '#f69e78',
        'orange-100': '#e68937',
        'orange-200': '#d6591e',

        red: '#ed4337',

        'pink-50': '#fff5f7',
        'pink-80': '#fff5f7',
        'pink-100': '#d152a4',
        'pink-150': '#fce1f4',
        'pink-200': '#fbb6ce',
        'pink-300': '#f687b3',
        'pink-400': '#ed64a6',
        'pink-500': '#d53f8c',
        'pink-600': '#b83280',

        'purple-100': '#e9d8fd',
        'purple-150': '#926cb8',
        'purple-200': '#824575'
      }
    },
    boxShadow: {
      button: '0 0.5em 0.5em -0.4em rgba(100 116 139)'
    }
  },
  plugins: [],
  important: false
};
