import { cookies } from "next/headers";
import { adminAuth } from "@/app/firebase/admin-config";

export interface AuthResult {
    isAuthenticated: boolean;
    userId?: string;
    error?: string;
}

export async function verifyAuth(requiredUserId?: string): Promise<AuthResult> {
    const sessionCookie = (await cookies()).get("session")?.value;

    if (!sessionCookie) {
        return { isAuthenticated: false, error: "Unauthorized" };
    }

    try {
        const decodedClaims = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );

        if (requiredUserId && decodedClaims.uid !== requiredUserId) {
            return {
                isAuthenticated: true,
                userId: decodedClaims.uid,
                error: "Forbidden",
            };
        }

        return {
            isAuthenticated: true,
            userId: decodedClaims.uid,
        };
    } catch (error) {
        return { isAuthenticated: false, error: "Invalid session" };
    }
}
