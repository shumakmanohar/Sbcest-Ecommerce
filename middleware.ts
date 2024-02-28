import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

const intlMiddleware = createMiddleware({
	locales: ["en", "ar"],
	defaultLocale: "en",
});

// export default authMiddleware({
// 	beforeAuth: (req) => {
// 		// Check the origin from the request
// 		// Execute next-intl middleware before Clerk's auth middleware
// 		if (
// 			req.nextUrl.pathname.startsWith("/_next") ||
// 			req.nextUrl.pathname.includes("/api/")
// 		) {
// 			return;
// 		}
// 		return intlMiddleware(req);
// 	},
// 	publicRoutes: [
// 		"((?!^/cms/).*)",
// 		"((?!^/checkout/).*)",
// 		"((?!^/dashboard/).*)",
// 	],
// });

// export const config = {
// 	matcher: [
// 		"/((?!.+\\.[\\w]+$|_next).*)",
// 		"/",
// 		"/(api|trpc)(.*)",
// 		"/(ar|en)/:path*",
// 	],
// };
