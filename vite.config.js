import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/js/react/login.jsx', 
                'resources/js/react/register.jsx',
            ],
            refresh: true,
            react: true,
        }),
        //react(),
    ],
});
