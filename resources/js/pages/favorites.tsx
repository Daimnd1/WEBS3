import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

    // Handle removing a favorite
    const handleRemoveFavorite = (productId: number) => {
        const newIds = ids.filter(id => id !== productId.toString());
        setIds(newIds);
        localStorage.setItem('favorites:ids', JSON.stringify(newIds));
        window.dispatchEvent(new CustomEvent('favorites:changed'));
    };

    // Filter products based on favorite IDs
    const favoriteProducts = allProducts.filter((product) =>
        ids.includes(product.id.toString()),
    );

    return (
        <>
            <Head title="Favorites - Gimme Electronics" />
            <AppLayout>
                {/* Header Section */}
                <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 px-3 sm:px-4 pt-20 sm:pt-32 md:pt-40 lg:pt-48 pb-6 sm:pb-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center text-white">
                            <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                                Your Favorites
                            </h1>
                            <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg lg:text-xl text-blue-100">
                                Explore your favorite tech products
                            </p>
                            <div className="flex justify-center">
                                <Badge className="bg-amber-400 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-black">
                                    {favoriteProducts.length} Products in Favorites
                                </Badge>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="bg-gray-50 px-3 sm:px-4 py-8 sm:py-10 md:py-12">
                    <div className="mx-auto max-w-7xl">
                        {favoriteProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 sm:p-10 md:p-12 text-center">
                                <Heart className="mb-3 sm:mb-4 h-14 w-14 sm:h-16 sm:w-16 text-gray-400" />
                                <h3 className="mb-2 text-lg sm:text-xl font-semibold text-gray-900">
                                    No favorites yet
                                </h3>
                                <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-500">
                                    Start adding products to your favorites list
                                </p>
                                <Link href="/products">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
                                        Browse Products
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {favoriteProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        className="block w-full"
                                    >
                                        <Card className="group overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-150">
                                            <CardContent className="p-0">
                                                <div className="relative overflow-hidden">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-48 sm:h-56 md:h-64 w-full object-contain bg-gray-50 p-3 sm:p-4"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleRemoveFavorite(
                                                                product.id,
                                                            );
                                                        }}
                                                        className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full bg-white p-1.5 sm:p-2 shadow-md transition-colors duration-150 hover:bg-red-50"
                                                    >
                                                        <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-red-500 text-red-500" />
                                                    </button>
                                                </div>
                                                <div className="p-3 sm:p-4">
                                                    <div className="mb-1.5 sm:mb-2">
                                                        <Badge className="text-[10px] sm:text-xs">
                                                            {product.category}
                                                        </Badge>
                                                    </div>
                                                    <h3 className="mb-1.5 sm:mb-2 line-clamp-2 text-sm sm:text-base font-semibold text-gray-900">
                                                        {product.name}
                                                    </h3>
                                                    <div className="mb-2 sm:mb-3 flex items-center gap-1">
                                                        <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                                                        <span className="text-xs sm:text-sm font-medium text-gray-900">
                                                            {product.rating}
                                                        </span>
                                                        <span className="text-xs sm:text-sm text-gray-500">
                                                            ({product.reviews})
                                                        </span>
                                                    </div>
                                                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                                                        <span className="text-base sm:text-lg md:text-xl font-bold text-blue-600">
                                                            ${product.price}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                                                                $
                                                                {
                                                                    product.originalPrice
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </AppLayout>
        </>
    );
}