/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	distDir: 'dist',
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
};

module.exports = nextConfig;