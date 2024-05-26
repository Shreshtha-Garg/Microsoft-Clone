/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      spacing:{
        13:'3.25rem',
        15:'3.75rem'
      }
      
    },
    screens: {
      sm: '540px',
      md: '860px',
      lg: '1084px',
      // all are overwritten
      xl: '1260px',
      '2xl': '1596px',
      '1.5xl':'1400px',
    }
  },
  plugins: [],
}

