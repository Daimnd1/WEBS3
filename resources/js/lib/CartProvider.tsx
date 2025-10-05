import React, {createContext, useContext, useState, useEffect, useCallback} from "react";
import { ICartContext, IShoppingCart, ICartItem, ITotalCart } from "@/types/cart";
import { resolve } from "path";

const itemTotal: ITotalCart = {
    subtotal: 0
};

const initialCart: IShoppingCart = {
    items: [],
    totals: itemTotal,
    isEmpty: true,
    item_count: 0
};

const CartContext = createContext<ICartContext | undefined>(undefined)

const MOCK_CART_ITEMS: ICartItem[] = [
    { cart_item_id: 101, id: 1, name: 'Wireless Mechanical Keyboard', slug: 'keyboard', price: 120.00, quantity: 1, total_price: 120.00, image_url: 'https://placehold.co/80x80/6366f1/ffffff?text=KBD' },
    { cart_item_id: 102, id: 2, name: '4K Ultra HD Monitor 27"', slug: 'monitor', price: 350.50, quantity: 2, total_price: 701.00, image_url: 'https://placehold.co/80x80/10b981/ffffff?text=MON' },
    { cart_item_id: 103, id: 3, name: 'Ergonomic Mouse', slug: 'mouse', price: 25.00, quantity: 1, total_price: 25.00, image_url: 'https://placehold.co/80x80/f59e0b/ffffff?text=MSE' },
];

const mockAPI = {
    fetchCart: (): Promise<IShoppingCart> => {
        const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.total_price, 0);

        return new Promise( resolve => setTimeout(() => resolve({
            items: MOCK_CART_ITEMS,
            totals: { subtotal },
            isEmpty: MOCK_CART_ITEMS.length === 0,
            item_count: MOCK_CART_ITEMS.length,
        }), 800))
    },

    updateCart: (id: number, qty: number): Promise<IShoppingCart> => {
        console.log(`[Mock API] Updating item ${id} to quantity ${qty}`);
        return new Promise(resolve => setTimeout(() => resolve(mockAPI.fetchCart()), 500)); 
    },

    removeItem: (id: number): Promise<IShoppingCart> => {
        console.log(`[Mock API] Removing item ${id}`);
        return new Promise(resolve => setTimeout(() => resolve(mockAPI.fetchCart()), 500));
    }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [cart, setCart] = useState<IShoppingCart>(initialCart);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState <string | null>(null);

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try{
            const data = await mockAPI.fetchCart();
            setCart(data);  
        }
        catch (e) {
            setError("Failed to load cart data.");
        } 
        finally {
            setIsLoading(false);
        }
    }, []);

    const updateQuantity = async (cartItemID: number, newQuantity: number) => {
        if(newQuantity <= 0) return removeFromCart(cartItemID);

        setIsLoading(true);
        try{
            const updatedNowCart = await mockAPI.updateCart(cartItemID, newQuantity);
            setCart(updatedNowCart);
            return true;
        }
        catch (e) {
            setError("Failed to update item quantity.");
            return false;
        }
        finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (cartItemID: number) => {
        setIsLoading(true);
        try{
            const updatedNowCart = await mockAPI.removeItem(cartItemID);
            setCart(updatedNowCart);
            return true;
        }
        catch (e) {
            setError("Failed to remove item.");
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        fetchCart();
    }, [fetchCart]);

    const contextValue: ICartContext = {
        cart,
        isLoading,
        error,
        fetchCart,
        addToCart: async () => { console.log("Add to Cart called (mocked)"); return true; },
        updateQuantity,
        removeFromCart,
        clearCart: async () => { console.log("Clear Cart called (mocked)"); return true; },
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
} 