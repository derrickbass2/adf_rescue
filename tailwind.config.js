/** @type {import('tailwindcss').Config} */
export default {
  content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}"
  ],
theme: {
extend: {
colors: {
'background-default': 'var(--background-default)',
'card-background': 'var(--card-background)',
'form-background': 'var(--form-background)',
'primary-color': 'var(--primary-color)',
'primary-color-dark': 'var(--primary-color-dark)',
'text-primary': 'var(--text-primary)',
'text-secondary': 'var(--text-secondary)',
'accent-color': 'var(--accent-color)',
'border-color': 'var(--border-color)',
'alert-background': 'var(--alert-background)',
'alert-border': 'var(--alert-border)',
'tooltip-background': 'var(--tooltip-background)',
'tooltip-text': 'var(--tooltip-text)'
},
fontFamily: {
'roboto': ['Roboto', 'sans-serif'],
'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
'roboto-slab': ['Roboto Slab', 'serif'],
},
},
},
plugins: [],
}