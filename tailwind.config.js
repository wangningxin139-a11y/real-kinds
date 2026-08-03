/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#111111',
        'bg-elevated': '#1A1A1A',
        text: '#F5F5F5',
        'text-secondary': '#8A8A8A',
        'text-tertiary': '#5A5A5A',
        accent: '#4EA1FF',
        border: '#222222',
        'border-strong': '#333333',
      },
      fontFamily: {
        cn: ['"HarmonyOS Sans SC"', '"PingFang SC"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        en: ['"SF Pro Display"', '"SF Pro Text"', '-apple-system', '"Helvetica Neue"', 'sans-serif'],
        num: ['"SF Mono"', '"SF Pro Display"', 'monospace'],
      },
      screens: {
        tablet: '768px',
        desktop: '1024px',
        wide: '1512px',
        cinema: '1920px',
      },
    },
  },
  plugins: [],
};

export default config;
