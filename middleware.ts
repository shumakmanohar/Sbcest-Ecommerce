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
			req.nextUrl.pathname.includes("/api/")
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
});

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
		"/",
		"/:locale/",
	],
};
