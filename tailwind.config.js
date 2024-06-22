/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aftb_blue_dark: '#5D5FEF',
        aftb_blue_active: '#5D5FEF',
        aftb_title: '#6B6B6B',
        aftb_greenbuton : '#2ED47A',
        aftb_redbuton : '#FF0010',
        aftb_gray: '#C2CFE0',
        aftb_modals : '#fff',
        aftb_bgmodal: '#E5E5E5',
        aftb_orange: '#FB432C',
        aftb_blue_active: '#264BCC',
        bg_img: '#fcfcfc',
        aftb_bg_page:'#f1f6fa'
      },
        fontSize: {
          sm: '0.8rem',
          base: '1rem',
          xl: '1.25rem',
          '2xl': '1.563rem',
          '3xl': '1.953rem',
          '4xl': '2.441rem',
          '5xl': '3.052rem',
      },
    },
  },
  plugins: [],
};



