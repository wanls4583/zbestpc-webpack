const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		'index': path.resolve(__dirname, 'src/index.js'),
		'login': path.resolve(__dirname, 'src/login.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name]/[name].js'
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
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
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
					//filename: 'images/[name]-[hash:6][ext][query]',
					filename: 'img/[name][ext][query]',
				}
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerWebpackPlugin()
		],
		splitChunks: {
			//chunks: 'all',
			//filename: 'vendor.js',
			minSize: 100 * 1024,
			cacheGroups: {
				jquery: {
					test: /[\\/]jquery\.js/,
					filename: 'js/jquery.js',
					chunks: 'all',
				},
				flexslider: {
					test: /[\\/]jquery\.flexslider\.js/,
					filename: 'js/flexslider.js',
					chunks: 'all',
				}
			},
		}
	},
	plugins: [
		new UglifyJsWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name]/[name].css'
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			filename: 'index.html',
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			filename: 'login.html',
			chunks: ['login']
		}),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, 'src/assets/img'),
				to: path.resolve(__dirname, 'dist/img')
			}]
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new CleanWebpackPlugin(),
		new VueLoaderPlugin()
	]
}