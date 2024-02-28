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
	async headers() {
		return [
			{
				source: "/api/payment/moyasar/webhook",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "false" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,DELETE,PATCH,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
					},
				],
			},
		];
	},
};

module.exports = withNextIntl(nextConfig);
