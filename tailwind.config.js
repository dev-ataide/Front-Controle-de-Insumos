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
        aftb_blue_dark: '#344293',
        aftb_blue_active: '#6774BD',
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
    },
  },
  plugins: [],
};



