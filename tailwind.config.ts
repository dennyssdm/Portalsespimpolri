import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        polri: {
          brown: '#3A2416',
          brownDark: '#21140C',
          gold: '#C9A227',
          goldSoft: '#E6C766',
          maroon: '#6B1F2A',
          black: '#111111',
          yellow: '#F5C542',
          red: '#B91C1C',
          white: '#FFFFFF',
          cream: '#F7F2E8'
        }
      },
      boxShadow: {
        soft: '0 12px 40px rgba(17, 17, 17, 0.08)',
        gold: '0 16px 50px rgba(201, 162, 39, 0.18)'
      },
      backgroundImage: {
        'polri-radial': 'radial-gradient(circle at top left, rgba(201,162,39,.28), transparent 28%), linear-gradient(135deg, #21140C 0%, #3A2416 42%, #6B1F2A 100%)'
      }
    }
  },
  plugins: []
}

export default config
