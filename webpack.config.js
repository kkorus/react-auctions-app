const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: [ 'babel-polyfill', path.join(__dirname, 'src/client/index.js') ],
	output: {
		path: __dirname + '/public/scripts',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [ 'es2015', 'react', 'stage-0' ]
				}
			}
		]
	},
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	plugins: [
		new UglifyJSPlugin({
			parallel: true,
			output: {
				comments: false,
				beautify: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	]
};
