import { adminAuth, adminDb } from "@/app/firebase/admin-config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
    try {
        console.log("ME API route called");

        // Log all request headers for debugging
        const requestHeaders = new Headers(request.headers);
        console.log("Request headers:");
        requestHeaders.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        // Get all cookies for debugging
        const cookieStore = await cookies();
        const allCookies = cookieStore.getAll();
        console.log(
            "All cookies:",
            allCookies.map((c) => `${c.name}=${c.value}`)
        );

        // Try to get session cookie
        const sessionCookie = cookieStore.get("session")?.value;
        console.log("Session cookie found:", sessionCookie ? "Yes" : "No");

        if (!sessionCookie) {
            console.log("No session cookie found, returning 401");
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        console.log("Verifying session cookie...");
        try {
            const decodedClaims = await adminAuth.verifySessionCookie(
                sessionCookie,
                true
            );
            console.log(
                "Session cookie verified successfully, user:",
                decodedClaims.uid
            );

            const user = {
                uid: decodedClaims.uid,
                email: decodedClaims.email || "",
                name: decodedClaims.name || "",
            };

            const userDoc = await adminDb
                .collection("users")
                .doc(user.uid)
                .get();
            const userData = userDoc.data();

            if (!userData) {
                console.log("User document not found in Firestore");
                return NextResponse.json(
                    { error: "User data not found" },
                    { status: 404 }
                );
            }

            console.log("Returning user data for:", user.uid);
            return NextResponse.json({
                uid: user.uid,
                email: user.email,
                name: user.name || userData.name,
                profilePicture: userData.profilePicture,
            });
        } catch (verifyError) {
            console.error("Session cookie verification failed:", verifyError);
            return NextResponse.json(
                { error: "Invalid session" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Error getting user session:", error);
        return NextResponse.json(
            { error: "Session verification failed" },
            { status: 500 }
        );
    }
}
