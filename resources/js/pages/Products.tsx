import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Filter,
    GamepadIcon,
    Grid3X3,
    Headphones,
    Monitor,
    Search,
    ShoppingCart,
    Smartphone,
    SortAsc,
    SortDesc,
    Star,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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
    {
        id: 101,
        name: 'MacBook Air M2',
        price: 1299,
        originalPrice: 1499,
        image: 'https://smvkt.com/cdn/shop/files/Apple-macbook-air-m2-13-spacegrey-1_grande.webp?v=1715679892',
        rating: 4.8,
        reviews: 245,
        category: 'laptops',
    },
    {
        id: 102,
        name: 'Dell XPS 13',
        price: 999,
        originalPrice: 1199,
        image: 'https://media.power-cdn.net/images/h-cba1e2d294aac389e7b1994922696cf1/products/4091793/4091793_3_600x600_w_g.webp',
        rating: 4.6,
        reviews: 189,
        category: 'laptops',
    },
    {
        id: 103,
        name: 'ThinkPad X1 Carbon',
        price: 1599,
        originalPrice: 1799,
        image: 'https://media.power-cdn.net/images/h-4d66e53000b630f5a07c1652f1e937bd/products/2297401/2297401_5_600x600_t_g.webp',
        rating: 4.7,
        reviews: 156,
        category: 'laptops',
    },
    {
        id: 104,
        name: 'HP Spectre x360',
        price: 1199,
        originalPrice: 1399,
        image: 'https://media.power-cdn.net/images/h-a169640802d31c8f1a4640b4b8f22cdf/products/1122064/1122064_5_600x600_w_g.webp',
        rating: 4.5,
        reviews: 203,
        category: 'laptops',
    },
    {
        id: 105,
        name: 'ASUS ZenBook Pro',
        price: 1899,
        originalPrice: 2099,
        image: 'https://dlcdnwebimgs.asus.com/gain/096bd769-b48d-41ea-9eb5-7d305aa8a6fe/',
        rating: 4.6,
        reviews: 134,
        category: 'laptops',
    },
    {
        id: 106,
        name: 'Surface Laptop Studio',
        price: 1699,
        originalPrice: 1899,
        image: 'https://media.power-cdn.net/images/h-94e42081b5bcf8e840b62f408c387d8a/products/2570591/2570591_8_600x600_t_g.webp',
        rating: 4.4,
        reviews: 167,
        category: 'laptops',
    },
    {
        id: 107,
        name: 'MacBook Pro 14 M3',
        price: 2199,
        originalPrice: 2399,
        image: 'https://idestiny.in/wp-content/uploads/2024/10/Macbook-Pro-14_-600x600.png',
        rating: 4.9,
        reviews: 312,
        category: 'laptops',
    },
    {
        id: 108,
        name: 'Razer Blade 15',
        price: 2299,
        originalPrice: 2599,
        image: 'https://media.power-cdn.net/images/h-b60fdb3aee88937e915fb8b0b2fd603c/products/1197251/1197251_1_600x600_t_g.webp',
        rating: 4.3,
        reviews: 98,
        category: 'laptops',
    },

        // Smartphones
    {
        id: 201,
        name: 'iPhone 15 Pro',
        price: 999,
        originalPrice: 1099,
        image: 'https://media.power-cdn.net/images/h-a23cdf386fee61e1ba4b7bd31eeec07e/products/2668264/2668264_10_600x600_t_g.webp',
        rating: 4.9,
        reviews: 567,
        category: 'smartphones',
    },
    {
        id: 202,
        name: 'Samsung Galaxy S24',
        price: 899,
        originalPrice: 999,
        image: 'https://media.power-cdn.net/images/h-a23cdf386fee61e1ba4b7bd31eeec07e/products/2668264/2668264_10_600x600_t_g.webp',
        rating: 4.7,
        reviews: 423,
        category: 'smartphones',
    },
    {
        id: 203,
        name: 'Google Pixel 8',
        price: 699,
        originalPrice: 799,
        image: 'https://roobotech.com.au/cdn/shop/files/Pixel8obsidian.jpg?v=1714801573',
        rating: 4.6,
        reviews: 289,
        category: 'smartphones',
    },
    {
        id: 204,
        name: 'OnePlus 12',
        price: 799,
        originalPrice: 899,
        image: 'https://jo-cell.com/cdn/shop/files/oneplus-12-16gb512gb.webp?v=1713683334',
        rating: 4.5,
        reviews: 178,
        category: 'smartphones',
    },
    {
        id: 205,
        name: 'iPhone 15 Pro Max',
        price: 1199,
        originalPrice: 1299,
        image: 'https://cdn.cdon.com/media-dynamic/images/product/cloud/store/CellPhones/000/188/453/689/188453689-320251677-11453-org.jpg?cache=133784582428524263&imWidth=600',
        rating: 4.9,
        reviews: 745,
        category: 'smartphones',
    },
    {
        id: 206,
        name: 'Samsung Galaxy S24 Ultra',
        price: 1299,
        originalPrice: 1399,
        image: 'https://media.power-cdn.net/images/h-5d11250f3965ee480635750d742d7301/products/2954969/2954969_28_600x600_t_g.webp',
        rating: 4.8,
        reviews: 456,
        category: 'smartphones',
    },
    {
        id: 207,
        name: 'Google Pixel 8 Pro',
        price: 999,
        originalPrice: 1099,
        image: 'https://cdn.cdon.com/media-dynamic/images/product/cloud/store/Telephony/000/150/520/434/150520434-288031218-11453-org.jpg?cache=133498943077644786&imWidth=600',
        rating: 4.7,
        reviews: 234,
        category: 'smartphones',
    },
    {
        id: 208,
        name: 'OnePlus 12 Pro',
        price: 899,
        originalPrice: 999,
        image: 'https://dv9dhd03d71d4.cloudfront.net/eyJidWNrZXQiOiJwcm9kLXd3dy1hc3NldHMtcGVyZmVjdHJlYyIsImtleSI6ImltYWdlcy9wcm9kdWN0cy9zbWFydHBob25lcy9QZXJmZWN0UmVjX1Bob25lX09uZVBsdXMtMTIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2MDAsImZpdCI6ImNvdmVyIn19fQ==',
        rating: 4.6,
        reviews: 156,
        category: 'smartphones',
    },

    // Headphones
    {
        id: 301,
        name: 'AirPods Pro 2',
        price: 249,
        originalPrice: 279,
        image: 'https://media.power-cdn.net/images/h-4815615e08ef1675c08a259bdf10e29e/products/1804024/1804024_3_600x600_w_g.webp',
        rating: 4.8,
        reviews: 678,
        category: 'headphones',
    },
    {
        id: 302,
        name: 'Sony WH-1000XM4',
        price: 299,
        originalPrice: 349,
        image: 'https://media.power-cdn.net/images/h-94536e7672c3bd470375c23b3d98d16f/products/1106906/1106906_15_600x600_t_g.webp',
        rating: 4.7,
        reviews: 445,
        category: 'headphones',
    },
    {
        id: 303,
        name: 'Bose QuietComfort',
        price: 329,
        originalPrice: 379,
        image: 'https://dantell.dk/images/Bose-QuietComfort-45-black-1.jpeg',
        rating: 4.6,
        reviews: 334,
        category: 'headphones',
    },
    {
        id: 304,
        name: 'Sennheiser HD 660S',
        price: 449,
        originalPrice: 499,
        image: 'https://media.power-cdn.net/images/h-e28cad0af55de194acba97576838f6fe/products/1057166/1057166_7_600x600_t_g.webp',
        rating: 4.9,
        reviews: 156,
        category: 'headphones',
    },
    {
        id: 305,
        name: 'AirPods Max',
        price: 479,
        originalPrice: 549,
        image: 'https://media.power-cdn.net/images/h-1b5db35a3af76265cca2f94e86cdec87/products/3614402/3614402_4_600x600_w_g.webp',
        rating: 4.5,
        reviews: 289,
        category: 'headphones',
    },
    {
        id: 306,
        name: 'Sony WH-1000XM5',
        price: 399,
        originalPrice: 449,
        image: 'https://media.power-cdn.net/images/h-0d66ad6626ad377f43daeaf02b0127d2/products/1478246/1478246_1_600x600_t_g.webp',
        rating: 4.8,
        reviews: 567,
        category: 'headphones',
    },
    {
        id: 307,
        name: 'Bose 700',
        price: 349,
        originalPrice: 399,
        image: 'https://media.power-cdn.net/images/h-759e54aca43d5ce1f29afe13f1ba32d0/products/1019225/1019225_4_600x600_t_g.webp',
        rating: 4.6,
        reviews: 234,
        category: 'headphones',
    },
    {
        id: 308,
        name: 'Audio-Technica ATH-M50x',
        price: 149,
        originalPrice: 169,
        image: 'https://r2.gear4music.com/media/16/165126/600/preview.jpg',
        rating: 4.7,
        reviews: 456,
        category: 'headphones',
    },

    // Gaming
    {
        id: 401,
        name: 'PlayStation 5',
        price: 499,
        originalPrice: 549,
        image: 'https://media.power-cdn.net/images/h-9be3b7b73ff7f7117da472fd6e29602f/products/2856454/2856454_1_600x600_w_g.webp',
        rating: 4.8,
        reviews: 892,
        category: 'gaming',
    },
    {
        id: 402,
        name: 'Xbox Series X',
        price: 499,
        originalPrice: 549,
        image: 'https://kosmosrenew.dk/cdn/shop/files/xbox-series-x-kosmos-renew-60987_grande.png?v=1746705894',
        rating: 4.7,
        reviews: 723,
        category: 'gaming',
    },
    {
        id: 403,
        name: 'Steam Deck',
        price: 399,
        originalPrice: 449,
        image: 'https://kosmosrenew.dk/cdn/shop/files/xbox-series-x-kosmos-renew-60987_grande.png?v=1746705894',
        rating: 4.5,
        reviews: 234,
        category: 'gaming',
    },
    {
        id: 404,
        name: 'Nintendo Switch OLED',
        price: 349,
        originalPrice: 379,
        image: 'https://cdn.lomax.dk/images/t_item_large/f_auto/v1719652019/produkter/70205130_1/nintendo-switch-oled-64gb-hvid-1.jpg',
        rating: 4.6,
        reviews: 567,
        category: 'gaming',
    },
    {
        id: 405,
        name: 'PlayStation 5 Digital',
        price: 399,
        originalPrice: 449,
        image: 'https://zrep.dk/media/catalog/product/cache/8ce56cb874d008a231e9732ece31296b/u/n/untitled.png',
        rating: 4.7,
        reviews: 445,
        category: 'gaming',
    },
    {
        id: 406,
        name: 'Xbox Series S',
        price: 299,
        originalPrice: 329,
        image: 'https://media.power-cdn.net/images/h-c443267b1d20c1a17bc4ef505653f141/products/2664289/2664289_5_600x600_w_g.webp',
        rating: 4.4,
        reviews: 356,
        category: 'gaming',
    },
    {
        id: 407,
        name: 'Steam Deck OLED',
        price: 549,
        originalPrice: 599,
        image: 'https://techvers.eu/wp-content/uploads/2023/11/steam_deck_oled_512gb-1.jpg',
        rating: 4.6,
        reviews: 123,
        category: 'gaming',
    },
    {
        id: 408,
        name: 'Nintendo Switch Lite',
        price: 199,
        originalPrice: 229,
        image: 'https://techvers.eu/wp-content/uploads/2023/11/steam_deck_oled_512gb-1.jpg',
        rating: 4.3,
        reviews: 789,
        category: 'gaming',
    },
];

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

    // Categories with icons
    const categories = [
        {
            id: 'all',
            name: 'All Products',
            icon: <Grid3X3 className="h-5 w-5" />,
            count: allProducts.length,
        },
        {
            id: 'laptops',
            name: 'Laptops',
            icon: <Monitor className="h-5 w-5" />,
            count: allProducts.filter((p) => p.category === 'laptops').length,
        },
        {
            id: 'smartphones',
            name: 'Smartphones',
            icon: <Smartphone className="h-5 w-5" />,
            count: allProducts.filter((p) => p.category === 'smartphones')
                .length,
        },
        {
            id: 'headphones',
            name: 'Headphones',
            icon: <Headphones className="h-5 w-5" />,
            count: allProducts.filter((p) => p.category === 'headphones')
                .length,
        },
        {
            id: 'gaming',
            name: 'Gaming',
            icon: <GamepadIcon className="h-5 w-5" />,
            count: allProducts.filter((p) => p.category === 'gaming').length,
        },
    ];

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
                <section className="border-b border-slate-200/50 bg-white/80 px-4 py-6 backdrop-blur-md">
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
                <section className="bg-white/90 px-4 py-8 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-8 lg:flex-row">
                            {/* Sidebar - Categories */}
                            <div className="flex-shrink-0 lg:w-64">
                                <div className="top-24 rounded-lg border border-slate-200/50 bg-white/80 p-6 text-slate-700 shadow-sm backdrop-blur-sm">
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
                                                className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-all duration-300 ${
                                                    selectedCategory ===
                                                    category.id
                                                        ? 'border border-indigo-200/50 bg-indigo-50/80 text-indigo-700 backdrop-blur-sm'
                                                        : 'hover:bg-white/60 hover:shadow-sm hover:backdrop-blur-sm'
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
                                        {filteredProducts.map((product) => (
                                            <Card
                                                key={product.id}
                                                className="group border-slate-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                            >
                                                <div className="relative">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-64 w-full rounded-xl bg-gray-50 object-cover"
                                                    />
                                                    <div className="absolute top-3 right-3 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                                        <ShoppingCart className="h-4 w-4 text-indigo-600" />
                                                    </div>
                                                </div>
                                                <CardContent className="p-4 text-slate-800">
                                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-900">
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
                                                                $
                                                                {
                                                                    product.originalPrice
                                                                }
                                                            </span>
                                                        </div>
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            Save $
                                                            {product.originalPrice -
                                                                product.price}
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
                            <Button
                                variant="outline"
                                size="lg"
                                className="group"
                            >
                                ← Back to Home
                            </Button>
                        </Link>
                    </div>
                </section>
            </AppLayout>
        </>
    );
}
