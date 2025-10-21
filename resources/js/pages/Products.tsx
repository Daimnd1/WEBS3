import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { allProducts} from '@/data/products/products';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useFavorites } from '@/lib/useFavorites'
import {
    Filter,
    GamepadIcon,
    Grid3X3,
    Headphones,
    Monitor,
    Search,
    Smartphone,
    SortAsc,
    SortDesc,
    Star,
    Heart,
} from 'lucide-react';
import { useEffect, useMemo, useState, useCallback, memo } from 'react';


interface ProductsPageProps {
    category?: string;
}

// Define categories outside component to avoid recreation
const CATEGORY_DEFINITIONS = [
    {
        id: 'all',
        name: 'All Products',
        icon: <Grid3X3 className="h-5 w-5" />,
    },
    {
        id: 'laptops',
        name: 'Laptops',
        icon: <Monitor className="h-5 w-5" />,
    },
    {
        id: 'smartphones',
        name: 'Smartphones',
        icon: <Smartphone className="h-5 w-5" />,
    },
    {
        id: 'headphones',
        name: 'Headphones',
        icon: <Headphones className="h-5 w-5" />,
    },
    {
        id: 'gaming',
        name: 'Gaming',
        icon: <GamepadIcon className="h-5 w-5" />,
    },
] as const;

export default function Products({
    category: initialCategory,
}: ProductsPageProps) {
    // State management
    const [selectedCategory, setSelectedCategory] = useState<string>(
        initialCategory || 'all',
    );
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { isFav, toggle } = useFavorites();

    // Memoize toggle to avoid creating new functions in render
    const handleToggleFavorite = useCallback((e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
    }, [toggle]);

    // Calculate category counts efficiently - only once when products change
    const categories = useMemo(() => {
        const counts: Record<string, number> = {
            all: allProducts.length,
            laptops: 0,
            smartphones: 0,
            headphones: 0,
            gaming: 0,
        };

        // Single pass through products to count all categories
        allProducts.forEach((product) => {
            if (counts[product.category] !== undefined) {
                counts[product.category]++;
            }
        });

        return CATEGORY_DEFINITIONS.map((cat) => ({
            ...cat,
            count: counts[cat.id] || 0,
        }));
    }, []);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(
                (product) => product.category === selectedCategory,
            );
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        // Sort products
        filtered.sort((a, b) => {
            let aValue: string | number, bValue: string | number;

            switch (sortBy) {
                case 'price':
                    aValue = a.price;
                    bValue = b.price;
                    break;
                case 'rating':
                    aValue = a.rating;
                    bValue = b.rating;
                    break;
                case 'reviews':
                    aValue = a.reviews;
                    bValue = b.reviews;
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

        return filtered;
    }, [selectedCategory, searchQuery, sortBy, sortOrder]);

    // Update URL when category changes
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
                <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 px-4 pt-48 pb-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center text-white">
                            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                                {getCurrentCategoryName()}
                            </h1>
                            <p className="mb-6 text-lg text-blue-100 md:text-xl">
                                Discover amazing tech products at unbeatable
                                prices
                            </p>
                            <div className="flex justify-center">
                                <Badge className="bg-amber-400 px-4 py-2 text-sm text-black">
                                    {filteredProducts.length} Products Available
                                </Badge>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters and Controls */}
                <section className="border-b border-slate-200/50 bg-white px-4 py-6">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                            {/* Search */}
                            <div className="relative max-w-md flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="border-slate-200/50 bg-white/60 pl-10 text-slate-700 backdrop-blur-sm transition-all focus:bg-white/80"
                                />
                            </div>

                            {/* Controls */}
                            <div className="flex flex-wrap items-center gap-4">
                                {/* Sort */}
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Sort by:
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(e.target.value)
                                        }
                                        className="h-8 rounded-md bg-white/60 px-3 py-1 text-sm text-slate-700 focus:bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="name">Name</option>
                                        <option value="price">Price</option>
                                        <option value="rating">Rating</option>
                                        <option value="reviews">Reviews</option>
                                    </select>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setSortOrder(
                                                sortOrder === 'asc'
                                                    ? 'desc'
                                                    : 'asc',
                                            )
                                        }
                                    >
                                        {sortOrder === 'asc' ? (
                                            <SortAsc className="h-4 w-4" />
                                        ) : (
                                            <SortDesc className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="bg-gray-50 px-4 py-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-8 lg:flex-row">
                            {/* Sidebar - Categories */}
                            <div className="flex-shrink-0 lg:w-64">
                                <div className="top-24 rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                        <Filter className="h-5 w-5" />
                                        Categories
                                    </h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        category.id,
                                                    )
                                                }
                                                className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors ${
                                                    selectedCategory ===
                                                    category.id
                                                        ? 'border border-indigo-200 bg-indigo-50 text-indigo-700'
                                                        : 'hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {category.icon}
                                                    <span className="font-medium">
                                                        {category.name}
                                                    </span>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {category.count}
                                                </Badge>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid/List */}
                            <div className="flex-1">
                                {filteredProducts.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <div className="mb-4 text-gray-400">
                                            <Search className="mx-auto h-16 w-16" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-600">
                                            No products found
                                        </h3>
                                        <p className="text-gray-500">
                                            Try adjusting your search or filters
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {filteredProducts.map((product) => {
                                            const isFavorite = isFav(product.id);
                                            return (
                                                <Link
                                                    key={product.id}
                                                    href={`/product/${product.id}`}
                                                    className="block"
                                                >
                                                    <Card className="group border-slate-200 bg-white transition-shadow duration-150 hover:shadow-lg">
                                                        <div className="relative">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-64 w-full rounded-xl bg-gray-50 object-cover"
                                                                loading="lazy"
                                                            />
                                                            <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => handleToggleFavorite(e, product.id)}
                                                                    className="rounded-full bg-white p-2.5 shadow-lg hover:scale-105 transition-transform"
                                                                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                                                >
                                                                    <Heart
                                                                        size={18}
                                                                        className={isFavorite ? "text-red-600" : "text-slate-400"}
                                                                        fill={isFavorite ? "currentColor" : "none"}
                                                                    />
                                                                </button>
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
                                            );
                                        })}
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
