import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"SF Pro Display"',
                    '"Segoe UI"',
                    'Roboto',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                ],
            },
            colors: {
                apple: {
                    gray: {
                        50: '#f5f5f7',
                        100: '#e8e8ed',
                        200: '#d2d2d7',
                        300: '#86868b',
                        400: '#515154',
                        500: '#1d1d1f',
                        600: '#121212',
                        700: '#000000',
                    },
                    blue: '#0066cc',
                },
                aurora: {
                    1: '#4F46E5', // Deep Cosmos Blue
                    2: '#FF5A5F', // Sunrise Coral
                    3: '#10B981', // Bioluminescent Mint
                }
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                'apple-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
            }
        },
    },
    plugins: [],
} satisfies Config
