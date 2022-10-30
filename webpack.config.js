const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		'index': path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		watchFiles: ['src/**/*'],
		compress: true,
		port: 9000,
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: [{
						loader: MiniCssExtractPlugin.loader,
						//options: {
						//	publicPath: path.resolve(__dirname, 'dist/css/')
						//}
					},
					'css-loader'
				]
			},
			{
				test: /\.png$|\.jpg$|\.gif$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024 // 小于4KB的图片会使用base64
					}
				},
				generator: {
					filename: 'images/[name]-[hash:6][ext][query]'
				}
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerWebpackPlugin()
		],
	},
	plugins: [
		new UglifyJsWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			chunks: ['index']
		}),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, 'src/img'),
				to: path.resolve(__dirname, 'dist/img')
			}]
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new CleanWebpackPlugin()
	]
}