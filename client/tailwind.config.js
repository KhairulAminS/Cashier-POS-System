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
          'checkout': '150px repeat(6, minmax(0, 1fr))',
        },
        gridRow: {
          'span-7': 'span 7 / span 7',
        },

        animation: {
          enter: 'enter 200ms ease-out',
          slideIn: 'slide-in 0.5s cubic-bezier(.41,.73,.51,1.02)',
          slideLeft: 'slide-left 3.5s linear forwards',
          leave: 'leave 150ms ease-in forwards',
          progress: 'progress 4s linear'
        },
        keyframes: {
          enter: {
            '0%': { transform: 'scale(0.9)', opacity: 0 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
          leave: {
            '0%': { transform: 'scale(1)', opacity: 1 },
            '100%': { transform: 'scale(0.9)', opacity: 0 },
          },
          'slide-in': {
            '0%': { transform: 'translateY(-100%)' },
            '100%': { transform: 'translateY(0)' },
          },
          'slide-left': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        }
      },
    },
    plugins: [],
  };