const { merge } = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.config');
const config = require('./env.config');

module.exports = merge(base, {
	mode: 'production',
	optimization: {
		minimize: true
	},
	plugins: [
		new webpack.DefinePlugin({
			process: {
				env: {
					API_URL: JSON.stringify(config.PRODUCTION.API_URL)
				}
			}
		})
	]
});
