module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
     extend: {},
     screens: {
      'sm': {'max': '639px'},
      'md':{'min':'640px','max': '1023px'}
     }
  },
  variants: {
    extend: {},
  },
  plugins: []
}