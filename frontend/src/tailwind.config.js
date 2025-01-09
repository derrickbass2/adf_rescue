/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        'primary': '#1E3A8A',  // Primary color for branding (buttons, links)
        'secondary': '#334155',  // Secondary color for body text
        'alert': '#FFE9A3',  // Custom alert background color
        'alert-border': '#FFE4A1',  // Custom alert border color
        'dark': '#1F2937',  // Dark shade for dark mode
        'light': '#F9FAFB',  // Light shade for backgrounds or cards
        'highlight': '#2563EB', // Highlight color for hover states, active elements
      },
      // Custom Fonts
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],  // Adding a popular web font
      },
      // Custom Spacing (margins, padding, etc.)
      spacing: {
        '18': '4.5rem', // Adding custom spacing for layout control
        '22': '5.5rem', // Example for larger spacing
      },
      // Custom Border Radius
      borderRadius: {
        'large': '12px',  // For rounded corners on large components
        'xl': '16px',     // Extra-large radius for cards or modals
      },
      // Custom Box Shadows
      boxShadow: {
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',  // Light shadow for elevation effect
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)', // Larger shadow for important elements
      },
      // Custom Typography (for larger headings or special elements)
      typography: {
        DEFAULT: {
          css: {
            color: '#212121',  // Default text color for paragraphs
            h1: {
              color: '#1E3A8A',  // Heading color
              fontWeight: '700',
            },
            h2: {
              color: '#1E3A8A',
              fontWeight: '600',
            },
            p: {
              color: '#334155',  // Body text color
            },
            a: {
              color: '#2563EB', // Links color
            },
            strong: {
              fontWeight: '700',
              color: '#1E3A8A', // Strong text color
            },
          },
        },
      },
    },
  },
  plugins: [
    // Tailwind CSS Plugins
    require('@tailwindcss/forms'), // Adds form styles (input, textarea, etc.)
    require('@tailwindcss/typography'), // Enhances typographic styles (headings, paragraphs, etc.)
    require('@tailwindcss/aspect-ratio'), // Adds aspect ratio utilities for responsive videos, images, etc.
    require('@tailwindcss/line-clamp'), // Allows you to clamp multiline text with ellipsis
    require('daisyui'),  // A plugin for pre-built component styles
  ],
}