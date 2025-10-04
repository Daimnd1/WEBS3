import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
    Star, 
    ShoppingCart, 
    Filter, 
    Search, 
    Monitor,
    Smartphone,
    Headphones,
    GamepadIcon,
    Grid3X3,
    SortAsc,
    SortDesc
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    reviews: number;
    category: string;
}

interface ProductsPageProps {
    category?: string;
}

const allProducts: Product[] = [
        // Laptops
        { id: 101, name: "MacBook Air M2", price: 1299, originalPrice: 1499, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop", rating: 4.8, reviews: 245, category: "laptops" },
        { id: 102, name: "Dell XPS 13", price: 999, originalPrice: 1199, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=200&fit=crop", rating: 4.6, reviews: 189, category: "laptops" },
        { id: 103, name: "ThinkPad X1 Carbon", price: 1599, originalPrice: 1799, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop", rating: 4.7, reviews: 156, category: "laptops" },
        { id: 104, name: "HP Spectre x360", price: 1199, originalPrice: 1399, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop", rating: 4.5, reviews: 203, category: "laptops" },
        { id: 105, name: "ASUS ZenBook Pro", price: 1899, originalPrice: 2099, image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&h=200&fit=crop", rating: 4.6, reviews: 134, category: "laptops" },
        { id: 106, name: "Surface Laptop Studio", price: 1699, originalPrice: 1899, image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&h=200&fit=crop", rating: 4.4, reviews: 167, category: "laptops" },
        { id: 107, name: "MacBook Pro 14 M3", price: 2199, originalPrice: 2399, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop", rating: 4.9, reviews: 312, category: "laptops" },
        { id: 108, name: "Razer Blade 15", price: 2299, originalPrice: 2599, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop", rating: 4.3, reviews: 98, category: "laptops" },
        
        // Smartphones
        { id: 201, name: "iPhone 15 Pro", price: 999, originalPrice: 1099, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop", rating: 4.9, reviews: 567, category: "smartphones" },
        { id: 202, name: "Samsung Galaxy S24", price: 899, originalPrice: 999, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop", rating: 4.7, reviews: 423, category: "smartphones" },
        { id: 203, name: "Google Pixel 8", price: 699, originalPrice: 799, image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=200&fit=crop", rating: 4.6, reviews: 289, category: "smartphones" },
        { id: 204, name: "OnePlus 12", price: 799, originalPrice: 899, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop", rating: 4.5, reviews: 178, category: "smartphones" },
        { id: 205, name: "iPhone 15 Pro Max", price: 1199, originalPrice: 1299, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop", rating: 4.9, reviews: 745, category: "smartphones" },
        { id: 206, name: "Samsung Galaxy S24 Ultra", price: 1299, originalPrice: 1399, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop", rating: 4.8, reviews: 456, category: "smartphones" },
        { id: 207, name: "Google Pixel 8 Pro", price: 999, originalPrice: 1099, image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=200&fit=crop", rating: 4.7, reviews: 234, category: "smartphones" },
        { id: 208, name: "OnePlus 12 Pro", price: 899, originalPrice: 999, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop", rating: 4.6, reviews: 156, category: "smartphones" },
        
        // Headphones
        { id: 301, name: "AirPods Pro 2", price: 249, originalPrice: 279, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=200&fit=crop", rating: 4.8, reviews: 678, category: "headphones" },
        { id: 302, name: "Sony WH-1000XM4", price: 299, originalPrice: 349, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop", rating: 4.7, reviews: 445, category: "headphones" },
        { id: 303, name: "Bose QuietComfort", price: 329, originalPrice: 379, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop", rating: 4.6, reviews: 334, category: "headphones" },
        { id: 304, name: "Sennheiser HD 660S", price: 449, originalPrice: 499, image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=200&fit=crop", rating: 4.9, reviews: 156, category: "headphones" },
        { id: 305, name: "AirPods Max", price: 479, originalPrice: 549, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=200&fit=crop", rating: 4.5, reviews: 289, category: "headphones" },
        { id: 306, name: "Sony WH-1000XM5", price: 399, originalPrice: 449, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop", rating: 4.8, reviews: 567, category: "headphones" },
        { id: 307, name: "Bose 700", price: 349, originalPrice: 399, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=200&fit=crop", rating: 4.6, reviews: 234, category: "headphones" },
        { id: 308, name: "Audio-Technica ATH-M50x", price: 149, originalPrice: 169, image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=200&fit=crop", rating: 4.7, reviews: 456, category: "headphones" },
        
        // Gaming
        { id: 401, name: "PlayStation 5", price: 499, originalPrice: 549, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=200&fit=crop", rating: 4.8, reviews: 892, category: "gaming" },
        { id: 402, name: "Xbox Series X", price: 499, originalPrice: 549, image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=200&fit=crop", rating: 4.7, reviews: 723, category: "gaming" },
        { id: 403, name: "Steam Deck", price: 399, originalPrice: 449, image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop", rating: 4.5, reviews: 234, category: "gaming" },
        { id: 404, name: "Nintendo Switch OLED", price: 349, originalPrice: 379, image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop", rating: 4.6, reviews: 567, category: "gaming" },
        { id: 405, name: "PlayStation 5 Digital", price: 399, originalPrice: 449, image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=300&h=200&fit=crop", rating: 4.7, reviews: 445, category: "gaming" },
        { id: 406, name: "Xbox Series S", price: 299, originalPrice: 329, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=200&fit=crop", rating: 4.4, reviews: 356, category: "gaming" },
        { id: 407, name: "Steam Deck OLED", price: 549, originalPrice: 599, image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop", rating: 4.6, reviews: 123, category: "gaming" },
        { id: 408, name: "Nintendo Switch Lite", price: 199, originalPrice: 229, image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=200&fit=crop", rating: 4.3, reviews: 789, category: "gaming" },
    ];

export default function Products({ category: initialCategory }: ProductsPageProps) {
    // State management
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Categories with icons
    const categories = [
        { id: 'all', name: 'All Products', icon: <Grid3X3 className="h-5 w-5" />, count: allProducts.length },
        { id: 'laptops', name: 'Laptops', icon: <Monitor className="h-5 w-5" />, count: allProducts.filter(p => p.category === 'laptops').length },
        { id: 'smartphones', name: 'Smartphones', icon: <Smartphone className="h-5 w-5" />, count: allProducts.filter(p => p.category === 'smartphones').length },
        { id: 'headphones', name: 'Headphones', icon: <Headphones className="h-5 w-5" />, count: allProducts.filter(p => p.category === 'headphones').length },
        { id: 'gaming', name: 'Gaming', icon: <GamepadIcon className="h-5 w-5" />, count: allProducts.filter(p => p.category === 'gaming').length },
    ];

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        const category = categories.find(cat => cat.id === selectedCategory);
        return category ? category.name : 'All Products';
    };

    return (
        <>
            <Head title={`${getCurrentCategoryName()} - Gimme Electronics`} />
            <AppLayout>
                {/* Header Section */}
                <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 px-4 pt-48 pb-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {getCurrentCategoryName()}
                            </h1>
                            <p className="text-lg md:text-xl text-blue-100 mb-6">
                                Discover amazing tech products at unbeatable prices
                            </p>
                            <div className="flex justify-center">
                                <Badge className="bg-yellow-400 text-black text-sm px-4 py-2">
                                    {filteredProducts.length} Products Available
                                </Badge>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters and Controls */}
                <section className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-4 py-6">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-white/60 text-slate-700 backdrop-blur-sm border-slate-200/50 focus:bg-white/80 transition-all"
                                />
                            </div>

                            {/* Controls */}
                            <div className="flex flex-wrap gap-4 items-center">
                                {/* Sort */}
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="h-8 text-sm text-slate-700 bg-white/60 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/80"
                                    >
                                        <option value="name">Name</option>
                                        <option value="price">Price</option>
                                        <option value="rating">Rating</option>
                                        <option value="reviews">Reviews</option>
                                    </select>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    >
                                        {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                  <section className="bg-white/90 backdrop-blur-md px-4 py-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Sidebar - Categories */}
                            <div className="lg:w-64 flex-shrink-0">
                                <div className="bg-white/80 text-slate-700 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200/50 p-6 top-24">
                                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                        <Filter className="h-5 w-5" />
                                        Categories
                                    </h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-300 ${
                                                    selectedCategory === category.id
                                                        ? 'bg-emerald-50/80 text-emerald-700 border border-emerald-200/50 backdrop-blur-sm'
                                                        : 'hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-sm'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {category.icon}
                                                    <span className="font-medium">{category.name}</span>
                                                </div>
                                                <Badge variant="secondary" className="text-xs">
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
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <Search className="h-16 w-16 mx-auto" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                                        <p className="text-gray-500">Try adjusting your search or filters</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredProducts.map((product) => (
                                            <Card key={product.id} className="group hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200/50">
                                                <div className="relative">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-48 w-full object-contain bg-gray-50"
                                                    />
                                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ShoppingCart className="h-4 w-4 text-emerald-600" />
                                                    </div>
                                                </div>
                                                <CardContent className="p-4 text-slate-800">
                                                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-slate-900">{product.name}</h3>
                                                    <div className="flex items-center mb-3">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="ml-1 text-sm font-medium text-slate-700">{product.rating}</span>
                                                        <span className="ml-1 text-sm text-slate-500">({product.reviews})</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="text-xl font-bold text-emerald-600">${product.price}</span>
                                                            <span className="ml-2 text-sm text-gray-500 line-through">
                                                                ${product.originalPrice}
                                                            </span>
                                                        </div>
                                                        <Badge variant="secondary" className="text-xs">
                                                            Save ${product.originalPrice - product.price}
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Back to Home */}
                <section className="bg-gray-50 px-4 py-8">
                    <div className="mx-auto max-w-7xl text-center">
                        <Link href="/">
                            <Button variant="outline" size="lg" className="group">
                                ← Back to Home
                            </Button>
                        </Link>
                    </div>
                </section>
            </AppLayout>
        </>
    );
}