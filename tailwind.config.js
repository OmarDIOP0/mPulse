// tailwind.config.js
const daisyui = require('daisyui'); // ✅ import de DaisyUI

module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blanc: '#ffffff',
        grisclair: '#f2f5f9',
        jaune: '#ffd100',
        rouge: '#ff0000',
        bleufonce: '#00377d',
        noir: '#09090b',
        'jaune-clair': '#fff5cc',
        'bleu-clair': '#e6f0ff'
      }
    }
  },
  plugins: [daisyui], // ✅ plus de parenthèses
};
