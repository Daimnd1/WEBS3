import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
    ids: string[];
    addToFavorites: (productId: string) => void;
    removeFromFavorites: (productId: string) => void;
    toggleFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [ids, setIds] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('favorites:ids');
            if (stored) {
                const parsed = JSON.parse(stored);
                setIds(Array.isArray(parsed) ? parsed : []);
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
            setIds([]);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('favorites:ids', JSON.stringify(ids));
        }
    }, [ids, isLoaded]);

    const addToFavorites = (productId: string) => {
        setIds((prev) => {
            if (prev.includes(productId)) return prev;
            return [...prev, productId];
        });
    };

    const removeFromFavorites = (productId: string) => {
        setIds((prev) => prev.filter((id) => id !== productId));
    };

    const toggleFavorite = (productId: string) => {
        setIds((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId);
            }
            return [...prev, productId];
        });
    };

    const isFavorite = (productId: string) => {
        return ids.includes(productId);
    };

    return (
        <FavoritesContext.Provider
            value={{
                ids,
                addToFavorites,
                removeFromFavorites,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}