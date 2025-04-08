"use client";

import { signInWithGoogle } from "@/app/actions/authActions";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const result = await signInWithGoogle();

            if (!result.success) {
                // Handle popup closed by user gracefully
                const firebaseError = result.error as { code?: string };
                if (
                    firebaseError &&
                    firebaseError.code === "auth/popup-closed-by-user"
                ) {
                    console.log("Sign-in popup was closed by the user");
                    return;
                }

                throw new Error("Sign in failed");
            }

            // Update Zustand store with user data
            setUser(result.user);

            router.replace("/book-corner");
        } catch (error) {
            console.error("Sign in Failed:", error);
            setError("Failed to sign in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-700 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>

                {error && (
                    <div className="p-3 text-sm bg-red-900 rounded-md">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="flex items-center justify-center w-full px-4 py-2 space-x-2 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                >
                    {isLoading ? (
                        "Signing in..."
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                            </svg>
                            <span>Sign in with Google</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
