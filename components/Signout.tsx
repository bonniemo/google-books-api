"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiSignOutBold } from "react-icons/pi";

const Signout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const signOut = useAuthStore((state) => state.signOut);
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            setIsLoading(true);
            await signOut();

            const cacheBuster = `?cb=${Date.now()}`;
            router.push(`/signIn${cacheBuster}`);
        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button onClick={handleSignOut} disabled={isLoading} className="p-2">
            {isLoading ? (
                "Signing Out..."
            ) : (
                <PiSignOutBold className="min-h-7 min-w-7" />
            )}
        </button>
    );
};

export default Signout;
