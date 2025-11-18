import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './lib/CartProvider';
import { FavoritesProvider } from './lib/FavoritesProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.{tsx,jsx}');
        // Try .tsx first, then .jsx
        for (const ext of ['tsx', 'jsx']) {
            const path = `./pages/${name}.${ext}`;
            if (pages[path]) {
                return pages[path]();
            }
        }
        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <CartProvider>
                <FavoritesProvider>
                    <App {...props} />
                </FavoritesProvider>
            </CartProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
