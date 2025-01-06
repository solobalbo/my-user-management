import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'toast-slide-in': {
          '0%': {
            transform: 'translateY(100%) translateX(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '1'
          },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'toast-slide-in': 'toast-slide-in 0.5s ease-out forwards',
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
}

export default config
