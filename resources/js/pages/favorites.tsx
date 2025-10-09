import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Heart, Star } from 'lucide-react';
import { allProducts } from '@/data/products/products';
import { useEffect, useState } from 'react';

export default function Favorites() {
    const [ids, setIds] = useState<string[]>([]);

    // Load favorite IDs from localStorage
    useEffect(() => {
        try {
            const v = JSON.parse(localStorage.getItem('favorites:ids') || '[]');
            setIds(Array.isArray(v) ? v : []);
        } catch {
            setIds([]);
        }
    }, []);

    // Filter products based on favorite IDs
    const favoriteProducts = allProducts.filter((product) =>
        ids.includes(product.id.toString()),
    );

    return (
        <>
            <Head title="Favorites - Gimme Electronics" />
            <AppLayout>
                {/* Header Section */}
                <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 px-4 pt-48 pb-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center text-white">
                            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                                Your Favorites
                            </h1>
                            <p className="mb-6 text-lg text-blue-100 md:text-xl">
                                Explore your favorite tech products
                            </p>
                            <div className="flex justify-center">
                                <Badge className="bg-amber-400 px-4 py-2 text-sm text-black">
                                    {favoriteProducts.length} Products in Favorites
                                </Badge>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="bg-white/90 px-4 py-8 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-8">
                            {/* Products Grid/List */}
                            <div className="flex-1">
                                {favoriteProducts.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <div className="mb-4 text-gray-400">
                                            <Heart className="mx-auto h-16 w-16" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-600">
                                            No favorites yet
                                        </h3>
                                        <p className="text-gray-500">
                                            Add products to your favorites to see them here
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {favoriteProducts.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                className="block"
                                            >
                                                <Card
                                                    className="group border-slate-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                >
                                                    <div className="relative">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-64 w-full rounded-xl bg-gray-50 object-cover"
                                                        />
                                                        <div className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow">
                                                            <Heart
                                                                size={18}
                                                                className="text-red-600"
                                                                fill="currentColor"
                                                            />
                                                        </div>
                                                    </div>
                                                    <CardContent className="p-4 text-slate-800">
                                                        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-slate-900">
                                                            {product.name}
                                                        </h3>
                                                        <div className="mb-3 flex items-center">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="ml-1 text-sm font-medium text-slate-700">
                                                                {product.rating}
                                                            </span>
                                                            <span className="ml-1 text-sm text-slate-500">
                                                                ({product.reviews})
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <span className="text-xl font-bold text-indigo-600">
                                                                    ${product.price}
                                                                </span>
                                                                <span className="ml-2 text-sm text-gray-500 line-through">
                                                                    ${product.originalPrice}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </AppLayout>
        </>
    );
}