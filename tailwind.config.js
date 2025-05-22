/** @type {import('tailwindcss').Config} */

const config = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	prefix: '',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
};
export default config;
