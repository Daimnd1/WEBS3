import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Star,
    Zap,
} from 'lucide-react';
import { allProducts, type Product } from '@/data/products';

interface ProductPageProps {
    productId: number;
}



export default function ProductPage({ productId}: ProductPageProps) {
    const id = Number(productId);
    const product = allProducts.find((product) => product.id === id);


    if (!product) {
        return (
            <AppLayout>
                <h1>Product not found</h1>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <head>
                <title>{product.name}</title>
            </head>

            <main className="bg-white p-4 md:p-8 lg:p-12 min-h-screen"> 
                <article className='bg-white/80 p-6 shadow-2xl rounded-xl
                                    grid grid-cols-1 lg:grid-cols-4 gap-6 text-black pt-10 pb-50'>
                    <section className='lg:col-span-2 space-y-4'>
                        <header className="bg-white/80 mb-4 pt-10">
                            <h1 className="text-3xl font-bold text-black">{product.name}</h1>
                        </header>
                        <figure>
                            <img src={product.image} alt={'${product.name} main image'} className="w-full h-full object-cover rounded-lg" />
                        </figure>
                    </section>

                    <section className='lg:col-span-2 grid grid-rows-1 grid-cols-2 gap-6 pt-22'>
                        {/* Price & rating */}
                        <div className='row-span-1 col-span-2 text-black p-4 rounded-lg shadow-md'>
                            <h2 className="text-xl font-semibold mb-2">Price & Rating</h2>
                            <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                                <div className='flex items-center space-x-3 mb-2 md:mb-0'> 
                                    <span className="text-2xl font-bold text-indigo-600">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="text-base text-gray-500 line-through">
                                        ${product.originalPrice}
                                    </span>
                                </div>
                                <div className='text-xl text-gray-700 flex items-center space-x-2'>
                                    <span className='font-medium'>{product.rating}</span> 
                                    <Star className="col-span-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>|</span>
                                    <span>Reviews: {product.reviews}</span>
                                </div>
                            </div>
                        </div>

                        <section className="space-y-4 col-span-full md:col-span-1">
                            <div className='rounded-lg shadow-inner p-2'>
                                <h2 className='text-xl font-semibold mb-2 w-100'>Short description</h2> 
                                <p className='text-l mb-2 w-100'>placeholder.</p>
                            </div>
                            
                            {/* Specifications */}
                            <div className='rounded-lg shadow-inner p-2'>
                                <h2 className='text-xl font-semibold mb-2'>Specifications</h2>
                                <dl>
                                    <dt>!Placeholder1!</dt>
                                    <dt>!Placeholder2!</dt>
                                    <dt>!Placeholder3!</dt>
                                </dl>
                            </div>
                        </section>

                        {/* Purchase Actions */}
                        <section className='col-span-2 md:col-span-1 p-4 bg-white rounded-lg shadow-inner'>
                            <h2 className='text-xl font-semibold mb-2'>Purchase options</h2>
                            <div className='text-l'>
                                <label htmlFor="quantity">Quantity:</label>
                                <input type="number" id="quantity" name="quantity" min="1" max="10" defaultValue="1" />
                            </div>
                            
                            <button type="button" className='text-white w-full mb-2 bg-indigo-600 hover:bg-indigo-500'>Add to Cart</button>
                            <button type="button" className='text-white w-full mb-2 bg-indigo-600 hover:bg-indigo-500'>Add to Favorites</button>
                        </section>
                    </section>
                </article>
            </main>
            
            {/* Shouldn't the footer be added to app-layout.tsx?*/}
            <footer className="bg-gray-900 px-4 py-12 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <h3 className="mb-4 text-2xl font-bold text-indigo-400">
                                Gimme Electronics
//                             </h3>
//                             <p className="mb-4 text-gray-300">
//                                 Your trusted destination for the latest
//                                 electronics and tech gadgets. We bring you
//                                 cutting-edge technology at unbeatable
//                                 prices.
//                             </p>
                            <div className="flex gap-2">
                                <Badge
                                    variant="outline"
                                    className="border-indigo-400 text-indigo-400"
                                >
                                    <Zap className="mr-1 h-3 w-3" />
                                    Fast Shipping
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="border-indigo-400 text-indigo-400"
                                >
                                    24/7 Support
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <Link
                                        href="/about"
                                        className="hover:text-indigo-400"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-indigo-400"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/shipping"
                                        className="hover:text-indigo-400"
                                    >
                                        Shipping Info
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/returns"
                                        className="hover:text-indigo-400"
                                    >
                                        Returns
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">
                                Categories
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <Link
                                        href="/laptops"
                                        className="hover:text-emerald-400"
                                    >
                                        Laptops
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/smartphones"
                                        className="hover:text-emerald-400"
                                    >
                                        Smartphones
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/headphones"
                                        className="hover:text-emerald-400"
                                    >
                                        Headphones
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/gaming"
                                        className="hover:text-emerald-400"
                                    >
                                        Gaming
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                        <p>
                            &copy; 2025 Gimme Electronics. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </AppLayout>
    );
}
