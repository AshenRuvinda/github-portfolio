/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Mona Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        gh: {
          bg: '#ffffff',
          canvas: '#f6f8fa',
          border: '#d0d7de',
          text: '#1f2328',
          muted: '#656d76',
          link: '#0969da',
          accent: '#0969da',
          btnBg: '#f6f8fa',
          btnBorder: '#d0d7de',
          navBg: '#24292f',
          navText: '#e6edf3',
          tag: '#ddf4ff',
          tagText: '#0550ae',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      }
    },
  },
  plugins: [],
}
