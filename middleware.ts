// import { authMiddleware } from "@clerk/nextjs";
// import createMiddleware from "next-intl/middleware";

// import { NextRequest, NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// const intlMiddleware = createMiddleware({
// 	locales: ["en", "ar"],
// 	defaultLocale: "en",
// });

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
// const allowedOrigins = [
// 	"https://www.google.com",
// 	"https://yoursite.com",
// 	"http://localhost:3000",
// 	"https://reqbin.com/",
// 	"https://moyasar.com/",
// 	"https://api.moyasar.com/",
// ];

//export function middleware(request: Request) {
// const origin = request.headers.get("origin");
// console.log(origin);

// if (origin && !allowedOrigins.includes(origin)) {
// 	return new NextResponse(null, {
// 		status: 400,
// 		statusText: "Bad Request",
// 		headers: {
// 			"Content-Type": "text/plain",
// 		},
// 	});
// }

// console.log("Middleware!");

// console.log(request.method);
// console.log(request.url);

//return NextResponse.next();
//}
