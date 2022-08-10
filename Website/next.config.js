/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	distDir: 'dist',
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
	webpack: (config) => {
		config.experiments = config.experiments || {};
		config.experiments.topLevelAwait = true;
		return config;
	},
};

module.exports = nextConfig;
