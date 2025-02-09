import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/books",
    "/pricing",
    "/api/.*",
    "/about",
    "/_next/static/.*",
  ],
  ignoredRoutes: [
    "/api/clerk",
    "/_next/image",
    "/favicon.ico",
  ],
});

export const config = {
  // Protects all routes, including api/trpc
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your middleware
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
}; 