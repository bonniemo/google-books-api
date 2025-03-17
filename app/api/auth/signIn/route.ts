import { adminAuth, adminDb } from "@/app/firebase/admin-config";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface RequestData {
    token: string;
    userData: {
        name: string;
        email: string;
        profilePicture: string;
    };
}

export async function POST(request: Request) {
    try {
        console.log("SignIn API route called");

        // Log request headers for debugging
        const requestHeaders = new Headers(request.headers);
        console.log("Request headers:");
        requestHeaders.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const { token, userData }: RequestData = await request.json();
        console.log(
            "Received token (truncated):",
            token.substring(0, 20) + "..."
        );

        console.log("Verifying ID token...");
        const decodedToken = await adminAuth.verifyIdToken(token);
        if (!decodedToken) {
            console.log("Token verification failed");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        console.log("Token verified successfully for user:", decodedToken.uid);
        const userId = decodedToken.uid;

        // Save user to Firestore
        console.log("Saving user to Firestore:", userId);
        await adminDb.collection("users").doc(userId).set(
            {
                name: userData.name,
                email: userData.email,
                profilePicture: userData.profilePicture,
                lastSignIn: new Date().toISOString(),
            },
            { merge: true }
        );

        // Create a session cookie
        console.log("Creating session cookie...");
        const expiresIn = 60 * 60 * 24 * 14 * 1000;
        const sessionCookie = await adminAuth.createSessionCookie(token, {
            expiresIn,
        });
        console.log(
            "Session cookie created (truncated):",
            sessionCookie.substring(0, 20) + "..."
        );

        // Create response with user data
        const response = NextResponse.json({
            message: "User logged in successfully",
            user: {
                uid: userId,
                name: userData.name,
                email: userData.email,
                profilePicture: userData.profilePicture,
            },
        });

        // Set the session cookie in the response
        console.log("Setting cookie in response...");
        response.cookies.set({
            name: "session",
            value: sessionCookie,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 14,
            path: "/",
        });

        // Log response headers
        console.log("Response headers will include:");
        console.log("Set-Cookie: session=...");

        console.log("Sign-in process completed successfully");
        return response;
    } catch (error) {
        console.error("Error during sign in:", error);
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
        );
    }
}
