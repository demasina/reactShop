var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "/public/build",
		publicPath: "build/",
		filename: "bundle.js"		
	},

	module: {
		loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /public/]
            },         	
			{
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/],
				query:
					{
						presets: ["es2015", "stage-0", "react"]
					}
			},		
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },  
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less-loader",
                exclude: [/node_modules/, /public/]
            }			
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: '../index.html',
      		template: 'src/index.html'
		})
	]
}