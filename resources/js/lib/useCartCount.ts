import { useEffect, useState } from 'react';

const CART_KEY = 'shopping_cart';

function getCount(): number {
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return 0;
        const items = JSON.parse(raw);
        return items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
    } catch {
        return 0;
    }
}

export function useCartCount() {
    const [count, setCount] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        setCount(getCount());

        const handleUpdate = () => {
            setCount(prev => {
                const next = getCount();
                if (next > prev) {
                    setAnimating(true);
                    setTimeout(() => setAnimating(false), 400);
                }
                return next;
            });
        };

        window.addEventListener('cart:updated', handleUpdate);
        return () => window.removeEventListener('cart:updated', handleUpdate);
    }, []);

    return { count, animating };
}
