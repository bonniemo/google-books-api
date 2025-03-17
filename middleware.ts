import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRequiredPaths = ["/dashboard", "/profile", "/settings"];
const authRedirectPaths = ["/signIn", "/signup", "/login"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    console.log(`Middleware processing path: ${pathname}`);

    // Skip middleware for API routes
    if (pathname.startsWith("/api/")) {
        console.log("Skipping middleware for API route");
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("session")?.value;
    const isAuthenticated = !!sessionCookie;

    console.log(`Path: ${pathname}, Authenticated: ${isAuthenticated}`);

    if (
        isAuthenticated &&
        authRedirectPaths.some((path) => pathname.startsWith(path))
    ) {
        console.log(
            "Redirecting authenticated user from auth page to dashboard"
        );
        return NextResponse.redirect(new URL("/book-corner", request.url));
    }

    if (
        !isAuthenticated &&
        authRequiredPaths.some((path) => pathname.startsWith(path))
    ) {
        console.log("Redirecting unauthenticated user to signin");
        return NextResponse.redirect(new URL("/signIn", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
