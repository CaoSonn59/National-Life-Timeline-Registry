/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        registry: {
          navy: '#0f172a',    // Dark navy for text
          red: '#dc2626',     // Alert/accent red
          pink: '#ed71a5',    // Pink accent
          light: '#f8fafc',   // Off-white background
          border: '#e2e8f0',  // Light border
          gray: '#64748b'     // Secondary text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 0.5s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(-1px, -2px)' },
          '60%': { transform: 'translate(2px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
        }
      }
    },
  },
  plugins: [],
}

