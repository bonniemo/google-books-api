import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
    const response = NextResponse.json({ message: "Signed out successfully" });

    response.cookies.set({
        name: "session",
        value: "",
        expires: new Date(0),
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return response;
}
