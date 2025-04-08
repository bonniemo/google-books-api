"use client";

import { auth, googleProvider } from "@/app/firebase/client-config";
import { signOut as firebaseSignOut, signInWithPopup } from "firebase/auth";

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();

        const response = await fetch("/api/auth/signIn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token,
                userData: {
                    name: result.user.displayName,
                    email: result.user.email,
                    profilePicture: result.user.photoURL,
                },
            }),
        });

        if (!response.ok) throw new Error("Sign in failed");
        return { success: true, user: (await response.json()).user };
    } catch (error: any) {
        if (error.code === "auth/popup-blocked") {
            return {
                success: false,
                error: "Please disable your popup blocker and try again.",
            };
        }

        return {
            success: false,
            error: error.message || "Sign in failed",
        };
    }
}

export async function signOut() {
    try {
        await firebaseSignOut(auth);
        await fetch("/api/auth/signOut", { method: "POST" });
        return { success: true };
    } catch (error) {
        console.error("Sign out failed:", error);
        return { success: false, error };
    }
}
