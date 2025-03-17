"use client";

import { auth, googleProvider } from "@/app/firebase/client-config";
import { signOut as firebaseSignOut, signInWithPopup } from "firebase/auth";

export async function signInWithGoogle() {
    try {
        googleProvider.setCustomParameters({
            prompt: "select_account",
        });

        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const token = await user.getIdToken();

        const response = await fetch("/api/auth/signIn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                token,
                userData: {
                    name: user.displayName,
                    email: user.email,
                    profilePicture: user.photoURL,
                },
            }),
        });

        if (!response.ok) {
            throw new Error("Sign in failed");
        }

        const data = await response.json();

        return {
            success: true,
            user: data.user,
        };
    } catch (error) {
        console.error("Sign in Failed:", error);
        return {
            success: false,
            error,
        };
    }
}

export async function signOut() {
    try {
        // 1. Sign out from Firebase Auth
        await firebaseSignOut(auth);

        // 2. Clear the server-side session
        await fetch("/api/auth/signOut", {
            method: "POST",
            credentials: "include",
        });

        // 3. Clear any local storage
        localStorage.removeItem("auth-storage");

        return { success: true };
    } catch (error) {
        console.error("Sign out failed:", error);
        return { success: false, error };
    }
}

export async function checkAuth() {
    try {
        const response = await fetch("/api/auth/me", {
            credentials: "include",
        });

        if (!response.ok) {
            if (response.status === 401) {
                return { authenticated: false };
            }
            throw new Error(`Auth check failed: ${response.status}`);
        }

        const userData = await response.json();
        return {
            authenticated: true,
            user: userData,
        };
    } catch (error) {
        console.error("Auth check error:", error);
        return { authenticated: false };
    }
}
