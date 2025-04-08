import { adminAuth } from "@/app/firebase/admin-config";
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
        const { token, userData }: RequestData = await request.json();
        const decodedToken = await adminAuth.verifyIdToken(token);

        if (!decodedToken) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days
        const sessionCookie = await adminAuth.createSessionCookie(token, {
            expiresIn,
        });

        const response = NextResponse.json({
            message: "Signed in successfully",
            user: {
                uid: decodedToken.uid,
                ...userData,
            },
        });

        response.cookies.set({
            name: "session",
            value: sessionCookie,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 14,
            path: "/",
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
        );
    }
}
