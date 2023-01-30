module.exports = {
    theme: {
        extend: {
            colors: {},
            boxShadow: {
                xs: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
                sm: '0 0.375rem 0.75rem rgba(0, 0, 0, 0.1)',
                md: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
                lg: '0 0.625rem 1.25rem rgba(0, 0, 0, 0.1)',
                xl: '0 0.75rem 1.5rem rgba(0, 0, 0, 0.1)',
            },
        },
        screens: {
            // High resolution laptop & desktop
            '3xl': '1920px',
            '2xl': '1700px',
            // Laptop
            xl: '1536px',
            lg: '1280px',
            // Tablet
            md: '1024px',
            sm: '768px',
            xs: '640px',
            // Mobile
            '2xs': '375px',
            // Mobile
            '3xs': '360px',
        }
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
