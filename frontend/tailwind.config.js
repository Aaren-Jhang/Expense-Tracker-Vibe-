/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'forest-green': '#2D5A27',
                'water-blue': '#E0F7FA',
            },
        },
    },
    plugins: [],
}
