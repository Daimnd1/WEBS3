export interface IProduct{
    id: number;
    name: string;
    slug: string;
    price: number;
    image_url: string;
}

export interface ICartItem extends IProduct{
    cart_item_id: number;
    quantity: number;
    total_price: number;
}

export interface ITotalCart {
    subtotal: number;
}

export interface IShoppingCart{
    items: ICartItem[];
    totals: ITotalCart;
    isEmpty: boolean;
    item_count: number;
}

export interface ICartContext{
    cart: IShoppingCart;
    isLoading: boolean;
    error: string | null;

    fetchCart: () => Promise<void>;
    addToCart: (productID: number, quantity: number) => Promise<boolean>;
    updateQuantity: (cartItemID: number, newQuantity: number) => Promise<boolean>;
    removeFromCart: (cartItemId: number) => Promise<boolean>;
    clearCart: () => Promise<boolean>;
}