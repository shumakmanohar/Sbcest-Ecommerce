const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin(
	// Specify a custom path here
	"./i18n.ts"
);
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "mediacdn.sbcest.com",
			},
		],
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
};

module.exports = withNextIntl(nextConfig);
