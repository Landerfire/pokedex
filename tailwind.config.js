/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				mainbg: "rgb(229 229 229)",
				darkBg: "rgb(51 65 85)",
				"darkBg-darker": "rgb(30, 41, 59)",
				"darkBg-darker-extreme": "rgb(15 23 42)",
				"darkBg-lighter": "rgb(71 85 105)",
				"darkBg-lighter-extreme": "rgb(203 213 225)",
				pinkParadise: "rgb(240, 56, 107)",
				customWhite: "#fbfffe",
			},
			screens: {
				
			}
		},
	},
	plugins: [],
	darkMode: "class",
}
