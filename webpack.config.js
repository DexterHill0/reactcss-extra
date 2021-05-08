// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const isProduction = process.env.NODE_ENV == "production";


const config = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "lib"),
	},
	plugins: [

	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/i,
				loader: "babel-loader",
			},
		],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = "production";

	} else {
		config.mode = "development";
	}
	return config;
};
