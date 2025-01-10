/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',  // Path to all of your template files
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E3A8A',
          secondary: '#334155',
          accent: '#2563EB',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Roboto', 'serif'],
        },
      },
    },
    plugins: [],
  }