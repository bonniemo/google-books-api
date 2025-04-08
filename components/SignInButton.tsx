"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/app/actions/authActions";

export function SignInButton() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setError(null);
        setIsLoading(true);

        const result = await signInWithGoogle();

        if (!result.success) {
            setError(result.error as string);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <button
                onClick={handleSignIn}
                disabled={isLoading}
                className="sign-in-button"
            >
                {isLoading ? "Signing in..." : "Sign in with Google"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
