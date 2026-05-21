import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

const CART_KEY = 'shopping_cart';

export interface CartItem {
    id: string;         // cart_item id (DB) or product id (localStorage)
    product_id: string;
    name: string;
    price: number;
    image: string | null;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    cartCount: number;
    addToCart: (product: { id: string; name: string; price: number; image: string | null }, quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ─── localStorage helpers ────────────────────────────────────────────────────

function readLocal(): CartItem[] {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function writeLocal(items: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(readLocal);
    const isLoggedIn = useRef(false);

    // Detect login state by trying the cart endpoint on mount
    useEffect(() => {
        axios.get('/cart/data')
            .then(res => {
                isLoggedIn.current = true;
                const dbItems: CartItem[] = res.data.items;
                setItems(dbItems);
                writeLocal(dbItems);
            })
            .catch(() => {
                isLoggedIn.current = false;
            });
    }, []);

    // React to user changes (login / logout / switch user)
    useEffect(() => {
        const handleAuthChange = (e: Event) => {
            const { userId } = (e as CustomEvent).detail;
            if (userId) {
                axios.get('/cart/data').then(res => {
                    isLoggedIn.current = true;
                    setItems(res.data.items);
                    writeLocal(res.data.items);
                }).catch(() => {});
            } else {
                isLoggedIn.current = false;
                setItems([]);
            }
        };

        window.addEventListener('auth:changed', handleAuthChange);
        return () => window.removeEventListener('auth:changed', handleAuthChange);
    }, []);

    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

    // ─── add ──────────────────────────────────────────────────────────────────
    const addToCart = (product: { id: string; name: string; price: number; image: string | null }, quantity = 1) => {
        if (isLoggedIn.current) {
            // Optimistic update
            setItems(prev => {
                const idx = prev.findIndex(i => i.product_id === product.id);
                if (idx > -1) {
                    const next = [...prev];
                    next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
                    writeLocal(next);
                    return next;
                }
                const next = [...prev, { id: product.id, product_id: product.id, name: product.name, price: product.price, image: product.image, quantity }];
                writeLocal(next);
                return next;
            });

            // Sync to DB — replace optimistic item id with real DB id
            axios.post('/cart/items', { product_id: product.id, quantity })
                .then(res => {
                    const dbItem: CartItem = res.data.item;
                    setItems(prev => {
                        const next = prev.map(i => i.product_id === product.id ? dbItem : i);
                        writeLocal(next);
                        return next;
                    });
                }).catch(() => {});
        } else {
            setItems(prev => {
                const idx = prev.findIndex(i => i.product_id === product.id);
                if (idx > -1) {
                    const next = [...prev];
                    next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
                    writeLocal(next);
                    return next;
                }
                const next = [...prev, { id: product.id, product_id: product.id, name: product.name, price: product.price, image: product.image, quantity }];
                writeLocal(next);
                return next;
            });
        }
    };

    // ─── remove ───────────────────────────────────────────────────────────────
    const removeFromCart = (itemId: string) => {
        setItems(prev => {
            const next = prev.filter(i => i.id !== itemId);
            writeLocal(next);
            return next;
        });

        if (isLoggedIn.current) {
            axios.delete(`/cart/items/${itemId}`).catch(() => {});
        }
    };

    // ─── update quantity ──────────────────────────────────────────────────────
    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) return removeFromCart(itemId);

        setItems(prev => {
            const next = prev.map(i => i.id === itemId ? { ...i, quantity } : i);
            writeLocal(next);
            return next;
        });

        if (isLoggedIn.current) {
            axios.patch(`/cart/items/${itemId}`, { quantity }).catch(() => {});
        }
    };

    // ─── clear ────────────────────────────────────────────────────────────────
    const clearCart = () => {
        setItems([]);
        writeLocal([]);
        if (isLoggedIn.current) {
            axios.delete('/cart/clear').catch(() => {});
        }
    };

    return (
        <CartContext.Provider value={{ items, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
