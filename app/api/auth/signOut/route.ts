import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Signed out successfully",
        });

        // Clear the session cookie
        response.cookies.set({
            name: "session",
            value: "",
            expires: new Date(0),
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        // Clear any other cookies related to authentication
        response.cookies.set({
            name: "firebase-session",
            value: "",
            expires: new Date(0),
            path: "/",
        });

        // Set cache-control header to prevent caching
        response.headers.set(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");

        return response;
    } catch (error) {
        console.error("Error signing out:", error);
        return NextResponse.json({ error: "Sign out failed" }, { status: 500 });
    }
}
