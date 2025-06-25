/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ownabee-inspired color palette
        primary: '#FFA726',    // Ownabee Orange
        secondary: '#FFD54F',  // Ownabee Yellow
        tertiary: '#81C784',   // Ownabee Green
        accent: '#FF7043',     // Ownabee Accent
        'accent-light': '#FFECB3', // Light accent
        background: '#FFFFFF',
        'background-alt': '#FFF8E1', // Warm light background
        'text-primary': '#4E342E', // Warm dark brown
        'text-secondary': '#795548', // Medium brown
      },
      fontFamily: {
        // Bold display fonts
        fredoka: ['var(--font-fredoka)', 'sans-serif'],
        baloo: ['var(--font-baloo)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        // Thin app UI fonts
        'lexend-deca': ['var(--font-lexend-deca)', 'sans-serif'],
        quicksand: ['var(--font-quicksand)', 'sans-serif'],
        // Default fonts
        sans: ['var(--font-lexend-deca)', 'var(--font-quicksand)', 'sans-serif'],
        heading: ['var(--font-fredoka)', 'var(--font-baloo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
