import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
	locales: ["en", "ar"],
	defaultLocale: "en",
});

export default authMiddleware({
	beforeAuth: (req) => {
		// Execute next-intl middleware before Clerk's auth middleware
		if (
			req.nextUrl.pathname.startsWith("/_next") ||
			req.nextUrl.pathname.includes("/api/") ||
			req.nextUrl.pathname.startsWith("/cms")
		) {
			return NextResponse.next();
		}
		return intlMiddleware(req);
	},
	publicRoutes: [
		"/:locale",
		"/:locale/products",
		"/:locale/cart",
		"/:locale/products/:id",
	],
	ignoredRoutes: ["/api/testmo", "/api/payment/moyasar/webhook", "/api/email"],
});
// source: "/((?!api|_next/static|_next/image|favicon.ico).*)";
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
// export const config = {
// 	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/api/payment/moyasar"],
// };
// export const config = {
// 	matcher: [
// 		/*
// 		 * Match all request paths except for the ones starting with:
// 		 * - api (API routes)
// 		 * - _next/static (static files)
// 		 * - _next/image (image optimization files)
// 		 * - favicon.ico (favicon file)
// 		 */
// 		"/((?!api/payment/moyasar|_next/static|_next/image|favicon.ico).*)",
// 		"/",
// 		"/:locale/",
// 	],
// };
