import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FavoriteButton } from '@/components/FavoriteButton';
import { getCategoryIcon } from '@/lib/categoryIcons';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Filter,
    Grid3X3,
    Search,
    SortAsc,
    SortDesc,
    Star,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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

interface ProductsPageProps {
    category?: string;
    products: Product[];
    categories: Category[];
}

export default function Products({ 
    category: initialCategory, 
    products: allProducts,
    categories: dbCategories 
}: ProductsPageProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory);
        }
    }, [initialCategory]);

    // Build categories with icons and counts
    const categories = useMemo(() => {
        // Count products per category from actual products
        const counts: Record<string, number> = {
            all: allProducts.length,
        };

        allProducts.forEach((product) => {
            const slug = product.category;
            counts[slug] = (counts[slug] || 0) + 1;
        });

        // Start with "All Products"
        const categoryList = [
            {
                id: 'all',
                name: 'All Products',
                slug: 'all',
                icon: <Grid3X3 className="h-5 w-5" />,
                count: counts.all,
            },
        ];

        // Add database categories with icons
        dbCategories.forEach((cat) => {
            categoryList.push({
                id: cat.slug,
                name: cat.name,
                slug: cat.slug,
                icon: getCategoryIcon(cat.name),
                count: counts[cat.slug] || 0,
            });
        });

        return categoryList;
    }, [allProducts, dbCategories]);

    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort products
        filtered = [...filtered].sort((a, b) => {
            let aValue: string | number, bValue: string | number;

            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
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
                    return 0;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [allProducts, selectedCategory, searchQuery, sortBy, sortOrder]);

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
                                    {filteredProducts.length} Products Available
                                </Badge>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters and Controls */}
                <section className="border-b border-slate-200/50 bg-white px-3 sm:px-4 py-4 sm:py-6">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 md:gap-6 lg:flex-row lg:items-center">
                            <div className="relative w-full max-w-md flex-1">
                                <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-slate-200/50 bg-white/60 pl-9 sm:pl-10 text-sm sm:text-base text-slate-700 backdrop-blur-sm transition-all focus:bg-white/80"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 w-full lg:w-auto">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                                        Sort by:
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="h-7 sm:h-8 rounded-md bg-white/60 px-2 sm:px-3 py-1 text-xs sm:text-sm text-slate-700 focus:bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="name">Name</option>
                                        <option value="price">Price</option>
                                        <option value="rating">Rating</option>
                                        <option value="reviews">Reviews</option>
                                    </select>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    >
                                        {sortOrder === 'asc' ? (
                                            <SortAsc className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        ) : (
                                            <SortDesc className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        )}
                                    </Button>
                                </div>
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
                                {filteredProducts.length === 0 ? (
                                    <div className="py-8 sm:py-12 text-center">
                                        <div className="mb-3 sm:mb-4 text-gray-400">
                                            <Search className="mx-auto h-12 w-12 sm:h-16 sm:w-16" />
                                        </div>
                                        <h3 className="mb-1.5 sm:mb-2 text-lg sm:text-xl font-semibold text-gray-600">
                                            No products found
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-500">
                                            Try adjusting your search or filters
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:grid-cols-3 xl:grid-cols-4">
                                        {filteredProducts.map((product) => (
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
                                                </CardContent>
                                            </Card>
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
