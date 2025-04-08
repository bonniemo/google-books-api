import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRequiredPaths = ["/dashboard", "/profile", "/settings"];
const authRedirectPaths = ["/signIn", "/signup", "/login"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    const isAuthenticated = !!request.cookies.get("session")?.value;

    if (
        isAuthenticated &&
        authRedirectPaths.some((path) => pathname.startsWith(path))
    ) {
        return NextResponse.redirect(new URL("/book-corner", request.url));
    }

    if (
        !isAuthenticated &&
        authRequiredPaths.some((path) => pathname.startsWith(path))
    ) {
        return NextResponse.redirect(new URL("/signIn", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
