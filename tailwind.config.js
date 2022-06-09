module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
      fontFamily: {
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      extend: {
        screens: {
          'md': '800px',
          '3xl': '2400px',
        },
        padding: {
          '2/3': '66.66667%',
          '1/3': '33.33334%',
          '5/6': '83.33334%'
        },
        gridTemplateRows: {
          'products': '50px minmax(0, 1fr)',
        },
        gridRow: {
          'span-7': 'span 7 / span 7',
        }
      },
    },
    plugins: [],
  };