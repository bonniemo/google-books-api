"use client";
import { auth } from "@/app/firebase/client-config";
import { useAuthStore } from "@/stores/useAuthStore";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in on the client side
                // Get user info from your API to ensure session is valid
                try {
                    const response = await fetch("/api/auth/me");
                    if (response.ok) {
                        const data = await response.json();
                        // Set user in Zustand store
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            name: firebaseUser.displayName,
                            profilePicture: firebaseUser.photoURL || undefined,
                        });
                    } else {
                        // Session expired or invalid
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user session:", error);
                    setUser(null);
                }
            } else {
                // User is signed out
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, setLoading]);

    return <>{children}</>;
}
