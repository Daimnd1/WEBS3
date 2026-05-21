import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './lib/CartProvider';
import { FavoritesProvider } from './lib/FavoritesProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Detect user changes on every Inertia navigation and clear stale cart/favorites
router.on('navigate', (event) => {
    const currentUserId = (event.detail.page.props as any)?.auth?.user?.id ?? null;
    const storedUserId = localStorage.getItem('auth:user_id') ?? null;

    if (currentUserId !== storedUserId) {
        localStorage.setItem('auth:user_id', currentUserId ?? '');
        localStorage.removeItem('shopping_cart');
        localStorage.removeItem('favorites:ids');
        window.dispatchEvent(new CustomEvent('auth:changed', { detail: { userId: currentUserId } }));
    }
});

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
