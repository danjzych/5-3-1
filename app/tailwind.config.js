/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				thunderbird: {
					50: '#fff2f1',
					100: '#ffe2e0',
					200: '#ffcac6',
					300: '#ffa69f',
					400: '#ff7267',
					500: '#fc4637',
					600: '#e92819',
					700: '#bf1d10',
					800: '#a21d12',
					900: '#861e16',
					950: '#490b06',
				},
			},
		},
	},
	plugins: [],
};
