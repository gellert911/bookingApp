import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/js/react/Login.jsx', 
                'resources/js/react/Register.jsx',
                'resources/js/react/Admin.jsx',
            ],
            refresh: true,
            react: true,
        }),
        //react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
});
