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
    				DEFAULT: '#3d3d3d'
    			},
    			text: {
    				DEFAULT: '#ffffff'
    			},
    			accent: {
    				DEFAULT: '#47e16e',
    				foreground: '#252525'
    			},
    			card: {
    				bg: '#ffffff',
    				text: '#3d3d3d'
    			}
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
    plugins: [],
} satisfies Config;
