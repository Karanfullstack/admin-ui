/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    safelist: [
        {
            pattern: /bg-\[rgba\(.*\)\]/, // Safelist all RGBA backgrounds
        },
    ],
    plugins: [],
};
