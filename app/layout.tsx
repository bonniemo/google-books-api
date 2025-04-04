import Nav from "@/components/Nav";
import AuthProvider from "@/providers/AuthProvider";

import Settings from "@/components/Settings";
import ThemeToggleBtn from "@/components/ThemeToggleBtn";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-base-light dark:bg-base-night text-base-dark dark:text-base-light px-4 sm:px-6">
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {/* top menu for desktop */}
                        <div className="hidden md:block sticky top-0 z-10 bg-background">
                            <Nav />
                            <ThemeToggleBtn />
                        </div>
                        {/* top settings for mobile */}
                        <div className="md:hidden bg-background flex items-center">
                            <Settings />
                            <ThemeToggleBtn />
                        </div>
                        <div className="mb-24">{children}</div>
                        {/* bottom menu for mobile */}
                        <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-background">
                            <Nav />
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
