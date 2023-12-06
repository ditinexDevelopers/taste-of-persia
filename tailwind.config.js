module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      suranna: ['Suranna', 'serif'],
      montez: ['Montez', 'cursive']
    },
    extend: {
      colors: {
        primary: '#b48c80',
        primarylight: '#fcda9a',
        backgroundlight: '#fff8ee',
        secondary: '#2a435d',
        secondaryhover: '#465563',
        secondarylight: 'rgba(20,33,46,0.5)',
        borderlight: '#e6e6e6',
        buttonbg: '#bc906b',
        titlebg: 'rgb(249,250,253)',
        bgcolor: 'rgba(237,242,249,0.96)',
        'blue-700': '#1976d2',
        'blue-500': '#2196f3'
      },
      backgroundImage: {
        'home-bg': "url('/images/heroBg.jpg')",
        'mbhome-bg': "url('/images/heroMobileBg.jpg')",
        'home-bg-overlay': "url('/images/slide01-overlay.png')",
        'hero-bg': "url('/images/hero2.jpg')"
      },
      screens: {
        xs: { max: '515px' }
      },
      borderWidth: {
        DEFAULT: '1px'
      },
      boxShadow: {
        'lg-pink':
          '0 12px 22px -5px rgba(0,0,0,0.12),0 10px 10px -5px rgba(0,0,0,0.04),0 13px 24px -11px rgba(194,24,91,0.6)',
        'lg-orange':
          '0 12px 22px -5px rgba(0,0,0,0.12),0 10px 10px -5px rgba(0,0,0,0.04),0 13px 24px -11px rgba(245,122,0,0.6)',

        'lg-purple':
          ' 0 12px 22px -5px rgba(0,0,0,0.12),0 10px 10px -5px rgba(0,0,0,0.04),0 13px 24px -11px rgba(123,31,162,0.6)',

        'lg-blue':
          '0 12px 22px -5px rgba(0,0,0,0.12),0 10px 10px -5px rgba(0,0,0,0.04),0 13px 24px -11px rgba(25,118,210,0.6)',
        'dashboard-md': '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: []
};