/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD6E8',
          lavender: '#DCC6FF',
          peach: '#FFD9C2',
          sky: '#CDEEFF',
          cream: '#FFF8EE',
          mint: '#D8FFE8',
          rose: '#FF85A1',
          purple: '#9B5DE5',
          gold: '#FFD166',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.75)',
          border: 'rgba(255, 255, 255, 0.5)',
          shadow: 'rgba(220, 198, 255, 0.3)',
        }
      },
      fontFamily: {
        sans: ['"Fredoka"', '"Quicksand"', 'sans-serif'],
        handwriting: ['"Pacifico"', 'cursive'],
        heading: ['"Fredoka"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
