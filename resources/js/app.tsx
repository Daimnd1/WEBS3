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
        const page = await pages[`./pages/${name}.tsx`]?.() || await pages[`./pages/${name}.jsx`]?.();
        if (!page) throw new Error(`Page not found: ${name}`);
        return page;
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
