const { merge } = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.config');
const config = require('./env.config');

module.exports = merge(base, {
	mode: 'production',
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
		new webpack.DefinePlugin({
			process: {
				env: {
					API_URL: JSON.stringify(config.DEMO.API_URL)
				}
			}
		})
	]
});
