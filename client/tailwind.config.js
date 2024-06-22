import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addComponents }) => {
      addComponents({
        '.typography-h1': { '@apply scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl': '' },
        '.typography-h2': { '@apply scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0': '' },
        '.typography-h3': { '@apply scroll-m-20 text-2xl font-semibold tracking-tight': '' },
        '.typography-h4': { '@apply scroll-m-20 text-xl font-semibold tracking-tight': '' },
        '.typography-p': { '@apply leading-7 [&:not(:first-child)]:mt-6': '' },
        '.typography-small': { '@apply text-sm font-medium leading-none': '' },
      });
    }),
  ],
};
