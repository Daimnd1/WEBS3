import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Pagination } from '@/components/Pagination';
import { getCategoryIcon } from '@/lib/categoryIcons';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Filter,
    Grid3X3,
    Star,
    ShoppingCart,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const CART_STORAGE_KEY = 'shopping_cart';

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    reviews: number;
    category: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    productCount: number;
}

interface PaginationData {
    data: Product[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface ProductsPageProps {
    category?: string;
    products: PaginationData;
    sharedCategories?: Category[];
}

export default function Products({ 
    category: initialCategory, 
    products: paginatedProducts,
    sharedCategories = []
}: ProductsPageProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
    const [addedToCart, setAddedToCart] = useState<string | null>(null);

    // Add to cart function
    const addToCart = (product: Product, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        const cart = cartJson ? JSON.parse(cartJson) : [];
        
        const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        
        // Show success state
        setAddedToCart(product.id);
        setTimeout(() => setAddedToCart(null), 1500);
    };

    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory);
        }
    }, [initialCategory]);

    // Build categories with icons and counts
    const categories = useMemo(() => {
        // Start with "All Products"
        const categoryList = [
            {
                id: 'all',
                name: 'All Products',
                slug: 'all',
                icon: <Grid3X3 className="h-5 w-5" />,
                count: sharedCategories.reduce((sum, cat) => sum + cat.productCount, 0),
            },
        ];

        // Add database categories with icons
        sharedCategories.forEach((cat) => {
            categoryList.push({
                id: cat.slug,
                name: cat.name,
                slug: cat.slug,
                icon: getCategoryIcon(cat.name),
                count: cat.productCount,
            });
        });

        return categoryList;
    }, [sharedCategories]);

    useEffect(() => {
        const currentUrl = new URL(window.location.href);

        if (selectedCategory === 'all') {
            currentUrl.searchParams.delete('category');
        } else {
            currentUrl.searchParams.set('category', selectedCategory);
        }
        window.history.replaceState({}, '', currentUrl.toString());
    }, [selectedCategory]);

    const getCurrentCategoryName = () => {
        const category = categories.find((cat) => cat.id === selectedCategory);
        return category ? category.name : 'All Products';
    };

    return (
        <>
            <Head title={`${getCurrentCategoryName()} - Gimme Electronics`} />
            <AppLayout>
                {/* Header Section */}
                <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 px-3 sm:px-4 pt-20 sm:pt-32 md:pt-40 lg:pt-48 pb-6 sm:pb-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center text-white">
                            <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                                {getCurrentCategoryName()}
                            </h1>
                            <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg lg:text-xl text-blue-100">
                                Discover amazing tech products at unbeatable prices
                            </p>
                            <div className="flex justify-center">
                                <Badge className="bg-amber-400 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-black">
                                    {paginatedProducts.total} Products Available
                                </Badge>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Main Content */}
                <section className="bg-gray-50 px-3 sm:px-4 py-4 sm:py-6 md:py-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:flex-row">
                            {/* Sidebar - Categories */}
                            <div className="flex-shrink-0 lg:w-64">
                                <div className="top-24 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 text-slate-700 shadow-sm">
                                    <h3 className="mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg font-semibold">
                                        <Filter className="h-5 w-5" />
                                        Categories
                                    </h3>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`flex w-full items-center justify-between rounded-xl p-2 sm:p-3 text-left transition-colors ${
                                                    selectedCategory === category.id
                                                        ? 'bg-indigo-50 text-indigo-600'
                                                        : 'hover:bg-slate-50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    {category.icon}
                                                    <span className="text-sm sm:text-base font-medium">
                                                        {category.name}
                                                    </span>
                                                </div>
                                                <Badge variant="secondary" className="text-xs">
                                                    {category.count}
                                                </Badge>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="flex-1">
                                {paginatedProducts.data.length === 0 ? (
                                    <div className="py-8 sm:py-12 text-center">
                                        <div className="mb-3 sm:mb-4 text-gray-400">
                                            <Grid3X3 className="mx-auto h-12 w-12 sm:h-16 sm:w-16" />
                                        </div>
                                        <h3 className="mb-1.5 sm:mb-2 text-lg sm:text-xl font-semibold text-gray-600">
                                            No products found
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-500">
                                            Try selecting a different category
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:grid-cols-3 xl:grid-cols-4">
                                            {paginatedProducts.data.map((product) => (
                                            <Card
                                                key={product.id}
                                                className="group overflow-hidden transition-all hover:shadow-xl"
                                            >
                                                <CardContent className="p-3 sm:p-4">
                                                    <Link href={`/product/${product.id}`}>
                                                        <div className="relative mb-3 sm:mb-4 aspect-square overflow-hidden rounded-lg bg-slate-100">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-full w-full object-contain p-2 sm:p-4 transition-transform group-hover:scale-105"
                                                            />
                                                            <div className="absolute right-2 top-2">
                                                                <FavoriteButton productId={product.id} />
                                                            </div>
                                                        </div>

                                                        <h3 className="mb-1.5 sm:mb-2 line-clamp-2 text-xs sm:text-sm font-semibold text-slate-800">
                                                            {product.name}
                                                        </h3>

                                                        <div className="mb-2 sm:mb-3 flex items-center gap-1">
                                                            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                                                            <span className="text-xs sm:text-sm font-medium text-slate-700">
                                                                {product.rating}
                                                            </span>
                                                            <span className="text-xs text-slate-500">
                                                                ({product.reviews})
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-baseline gap-1 sm:gap-2">
                                                                <span className="text-base sm:text-lg font-bold text-indigo-600">
                                                                    ${product.price}
                                                                </span>
                                                                {product.originalPrice && product.originalPrice > product.price && (
                                                                    <span className="text-xs text-slate-500 line-through">
                                                                        ${product.originalPrice}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => addToCart(product, e)}
                                                        className={`mt-3 w-full py-2 px-4 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                                                            addedToCart === product.id
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                                        }`}
                                                    >
                                                        <ShoppingCart className="h-4 w-4" />
                                                        {addedToCart === product.id ? '✓ Added!' : 'Add to Cart'}
                                                    </button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        </div>
                                        
                                        {/* Pagination */}
                                        <Pagination data={paginatedProducts} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </AppLayout>
        </>
    );
}
