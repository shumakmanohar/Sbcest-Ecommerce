import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
<<<<<<< HEAD
	publicRoutes: ["/"],
=======
	publicRoutes: [
		"/",
		"/products",
		"/cart",
		"/products/:id",
		"/api/products",
		"/api/products/:id",
	],
>>>>>>> front-end-clone-new
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
