/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	distDir: 'dist',
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
	webpack: (config) => {
		config.experiments = config.experiments || {};
		config.experiments.topLevelAwait = true;
		return config;
	},
};

module.exports = nextConfig;
