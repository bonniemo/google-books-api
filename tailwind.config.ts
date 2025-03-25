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
                base: {
                    night: "#18181B",
                    light: "#F2F9F9",
                    dark: "#1A2C32",
                },
                accent: {
                    dark: "#3C747E",
                    light: "#C0DFE1",
                    accent: "#79B6BC",
                    soft: "#94C8CC",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [],
} satisfies Config;
