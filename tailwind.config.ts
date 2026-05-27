import type { Config } from 'tailwindcss';

/**
 * St. John River Valley palette.
 * Drawn from the river, the spruce forest, weathered barn wood, brick foundations,
 * and the warm cream of old photo paper. These are the only brand colours used —
 * we deliberately avoid Tailwind's stock palette so the site does not look generic.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        river: {
          DEFAULT: '#1f3b5b', // deep river blue, used for headings and primary accents
          deep: '#142a44',
          mist: '#3e5d80',
          fog: '#dde5ee'
        },
        spruce: {
          DEFAULT: '#2f4a3d',
          dark: '#1d3128',
          moss: '#6d8470'
        },
        wood: {
          DEFAULT: '#8b6f47', // weathered barn board
          dark: '#5c4a2f',
          pale: '#c9b596'
        },
        brick: {
          DEFAULT: '#9c4a3a', // foundation brick, used very sparingly
          dark: '#6e2f24'
        },
        cream: {
          DEFAULT: '#f5ede0', // warm photo paper
          deep: '#ece1cd',
          soft: '#fbf7f0'
        },
        ink: {
          DEFAULT: '#1b1a17', // not pure black — feels archival
          soft: '#3a3833',
          mute: '#6b6760'
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        archive: '0.18em'
      },
      maxWidth: {
        prose: '68ch',
        gallery: '88rem'
      },
      boxShadow: {
        plate: '0 1px 0 rgba(27,26,23,0.08), 0 16px 40px -24px rgba(27,26,23,0.35)',
        frame: '0 0 0 1px rgba(27,26,23,0.08), 0 24px 48px -28px rgba(27,26,23,0.45)'
      }
    }
  },
  plugins: []
};

export default config;
