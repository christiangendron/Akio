/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './navigation/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#ffffff',
        surface: '#f5f5f5',
        accent: '#000000',
        onPrimary: '#ffffff',
        onSecondary: '#ffffff',
        background: '#F1F1F1',
        primaryDark: '#3498db',
        secondaryDark: '#404040',
        surfaceDark: '#f5f5f5',
        accentDark: '#EB327F',
        onPrimaryDark: '#ffffff',
        onSecondaryDark: '#ffffff',
        backgroundDark: '#282828',
      },
    },
  },
  plugins: [],
};


