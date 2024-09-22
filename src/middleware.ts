import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes to bypass authentication
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, request) => {
	// Skip authentication for public routes
	if (!isPublicRoute(request)) {
		auth().protect(); // Protect other routes
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals, static files, and API routes
		"/((?!_next|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
	],
};
