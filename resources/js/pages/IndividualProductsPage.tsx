import AppLayout from '@/layouts/app-layout';
import { Star } from 'lucide-react';
import type { Product } from '@/types';
import { FavoriteButton } from '@/components/FavoriteButton';
import { useState } from 'react';

const CART_STORAGE_KEY = 'shopping_cart';

interface ProductPageProps {
    product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);

    const addToCart = () => {
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        const cart = cartJson ? JSON.parse(cartJson) : [];
        
        const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        
        // Show success state
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <AppLayout>
            <head>
                <title>{product.name}</title>
            </head>

            <section className="grid justify-center bg-slate-100 p-4 md:p-8 lg:p-12">
                <article className="mt-16 grid h-fit max-w-3xl rounded-xl bg-slate-50 p-6 pb-12 text-black shadow-2xl lg:max-w-6xl lg:grid-cols-2">
                    <section>
                        <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-contain"
                            />
                            <div className="absolute right-4 top-4">
                                <FavoriteButton productId={product.id} size="lg" />
                            </div>
                        </div>
                    </section>
                    <section className="grid content-center">
                        <h1 className="md: text-3xl text-slate-800">
                            {product.name}
                        </h1>
                        <div className="flex items-center justify-between gap-2">
                            <div className="relative mt-2 flex items-center gap-2">
                                <span className="text-3xl font-bold text-indigo-600">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-base text-gray-500 line-through">
                                    ${product.originalPrice}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-600">
                                    {product.rating}
                                </span>
                                <Star className="col-span-2 h-5 w-5 fill-amber-400 text-amber-400" />
                            </div>
                        </div>
                        <div className="mt-1 text-base text-slate-500">
                            <span className='hover:underline hover:text-indigo-600'> 
                                <a href=''>Reviews: {product.reviews}</a>
                            </span>
                        </div>

                        <h2 className="mt-2 text-xl font-semibold text-slate-700">
                            Specifications
                        </h2>
                        <ul className="mt-1 grid gap-1 rounded-lg text-slate-600">
                            {product.specs?.map((spec) => (
                                <li key={spec.name} className="border-b border-slate-200 pb-1 last:border-b-0">
                                    <strong>{spec.name}:</strong> {spec.value}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            <h2 className="mb-2 text-xl font-semibold text-slate-700">
                                Purchase options
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        className="rounded-md border-2 border-slate-200 px-2 py-1 transition-colors duration-300 hover:border-indigo-400"
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        max="10"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={addToCart}
                                    className={`relative z-0 w-full cursor-pointer overflow-hidden rounded-md py-1.5 text-white transition-transform duration-300 ease-bouncy after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:origin-right after:scale-x-0 after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left hover:after:scale-x-100 active:scale-90 ${
                                        addedToCart 
                                            ? 'bg-green-600 after:bg-green-700' 
                                            : 'bg-indigo-500 after:bg-indigo-700'
                                    }`}
                                >
                                    {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                                </button>
                                
                            </div>

                            <div className="flex items-center gap-4 mt-4"> 
                                <button
                                    type="button"
                                    className="relative z-0 w-full cursor-pointer overflow-hidden rounded-md bg-indigo-500 py-1.5 text-white transition-transform duration-300 ease-bouncy after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:origin-right after:scale-x-0 after:bg-indigo-700 after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left hover:after:scale-x-100 active:scale-90"
                                >
                                    Add review
                                </button>
                            
                                <button
                                    type="button"
                                    className="relative z-0 w-full cursor-pointer overflow-hidden rounded-md bg-indigo-500 py-1.5 text-white transition-transform duration-300 ease-bouncy after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:origin-right after:scale-x-0 after:bg-indigo-700 after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left hover:after:scale-x-100 active:scale-90"
                                >
                                    Add to Favorites
                                </button>
                            </div>
                        </div>
                    </section>
                    <article className='col-span-full'>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-700">
                            Description/ Product overview
                        </h2>
                        <p className="whitespace-pre-line text-slate-600">
                        {product.description || 'No description available for this product.'}</p>
                    </article>
                </article>
            </section>
            
        </AppLayout>
    );
}
