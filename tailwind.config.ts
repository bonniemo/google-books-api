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
            },
        },
    },
    plugins: [],
} satisfies Config;
