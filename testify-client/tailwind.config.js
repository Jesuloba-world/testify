module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				white: "#ffffff",
				"cultured-white": "#eeefef",
				"quick-silver": "#a3a4a5",
				"steel-blue": "#b5c6d6",
				"rich-black": "#070707",
				"davy-grey": "#555657",
				"superior-blue": "#68a2bb",
				"shadow-brown": "#927D63",
				"blue-green": "#89D2CC",
				"blue-green-dark": "#43B1A8",
			},
			gridTemplateColumns: {
				layout: "18rem 1fr",
			},
		},
		fontFamily: {
			head: ['"Open Sans"', "sans-serif"],
		},
	},
	plugins: [],
};
