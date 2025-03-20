import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"], // Ensure dark mode is enabled
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: "#3d3d3d",
                },
                text: {
                    DEFAULT: "#ffffff",
                },
                accent: {
                    DEFAULT: "#47e16e", // Using your background color as accent
                    foreground: "#252525", // Using your text color as accent-foreground
                },
                card: {
                    bg: "#ffffff",
                    text: "#3d3d3d",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
