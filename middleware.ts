import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
	locales: ["en", "ar"],
	defaultLocale: "en",
});

export default authMiddleware({
	beforeAuth: (req) => {
		// Execute next-intl middleware before Clerk's auth middleware
		if (
			req.nextUrl.pathname.startsWith("/_next") ||
			req.nextUrl.pathname.includes("/api/")
		) {
			return;
		}
		return intlMiddleware(req);
	},
	publicRoutes: [
		"((?!^/cms/).*)",
		"((?!^/checkout/).*)",
		"((?!^/dashboard/).*)",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(ar|en)/:path*"],
};
