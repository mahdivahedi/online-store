
const withPlugins = require('next-compose-plugins');

const bundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === 'true',
});
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');

const env = require('./env.js');

const webpack = config => {
	// Fixes npm packages that depend on `fs` module
	config.node = {
		fs: 'empty'
	}

	// We push our config into the resolve.modules array
	// config.resolve.modules.push(path.resolve('./'))

	config.module = {
		...config.module,
		rules: [
			...config.module.rules,
			// {
			// 	// Preprocess 3rd party .less files located in node_modules
			// 	test: /\.less$/,
			// 	include: /node_modules/,
			// 	use: [
			// 		process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
			// 		'css-loader',
			// 		'less-loader',
			// 	],
			// },
			{
				test: /\.(eot|otf|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/',
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							// Inline files smaller than 10 kB
							limit: 10 * 1024,
							noquotes: true,
							outputPath: 'images/',
						},
					},
				],
			},
			{
				test: /\.(jpg|png|gif|webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							// Inline files smaller than 10 kB
							// limit: 10 * 1024,
							outputPath: 'images/',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							outputPath: 'images/',
							mozjpeg: {
								enabled: false,
								// NOTE: mozjpeg is disabled as it causes errors in some Linux environments
								// Try enabling it in your environment by switching the config to:
								// enabled: true,
								// progressive: true,
							},
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							// pngquant: {
							// 	quality: '65-90',
							// 	speed: 4,
							// },
							// the webp option will enable WEBP
							// webp: {
							// 	quality: 75,
							// },
						},
					},
				],
			},
			{
				test: /\.(mp4|webm)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
					},
				},
			},
		],
	};
	

	return config;
};

const nextConfig = {
	devIndicators: {
		autoPrerender: true,
	},
	useFileSystemPublicRoutes: false,
	webpack,
	compress: true,
	env: env[process.env.APP_ENV],
};

module.exports = withPlugins([
	[bundleAnalyzer, {}],
	[css, {}],
	[sass, {}],
], nextConfig);