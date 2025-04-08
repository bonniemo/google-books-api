import { signOut } from "@/app/actions/authActions";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    uid: string;
    email: string | null;
    name: string | null;
    profilePicture?: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: true,
            setUser: (user) => set({ user, isLoading: false }),
            setLoading: (isLoading) => set({ isLoading }),
            signOut: async () => {
                try {
                    const result = await signOut();
                    if (result.success) {
                        set({ user: null });
                    }
                } catch (error) {
                    console.error("Sign out failed:", error);
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ user: state.user }),
        }
    )
);
