import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Star, ShoppingCart, Zap, Smartphone, Headphones, Monitor, GamepadIcon, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

export default function Home() {
    // Featured products for the banner
    const featuredProducts = [
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            price: 1199,
            originalPrice: 1399,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
            rating: 4.9,
            badge: "Featured",
            catchyText: "Titanium. So strong. So light. So Pro.",
            description: "Experience the latest iPhone with revolutionary titanium design, advanced camera system, and A17 Pro chip.",
            highlight: "Save $200"
        },
        {
            id: 2,
            name: "MacBook Pro M3",
            price: 1999,
            originalPrice: 2299,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
            rating: 4.8,
            badge: "New Arrival",
            catchyText: "Mind-blowing. Game-changing. Jaw-dropping.",
            description: "The most advanced MacBook Pro ever. With M3 chip for unprecedented performance and all-day battery life.",
            highlight: "Limited Time Offer"
        },
        {
            id: 3,
            name: "Sony WH-1000XM5",
            price: 399,
            originalPrice: 449,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
            rating: 4.7,
            badge: "Best Seller",
            catchyText: "Silence the world. Amplify your music.",
            description: "Industry-leading noise canceling with exceptional sound quality and smart features for the ultimate listening experience.",
            highlight: "Customer Favorite"
        }
    ];

    // Product categories with their respective products
    const categories = [
        {
            name: "Laptops",
            icon: <Monitor className="h-6 w-6" />,
            products: [
                {
                    id: 101,
                    name: "MacBook Air M2",
                    price: 1299,
                    originalPrice: 1499,
                    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop",
                    rating: 4.8,
                    reviews: 245
                },
                {
                    id: 102,
                    name: "Dell XPS 13",
                    price: 999,
                    originalPrice: 1199,
                    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=200&fit=crop",
                    rating: 4.6,
                    reviews: 189
                },
                {
                    id: 103,
                    name: "ThinkPad X1 Carbon",
                    price: 1599,
                    originalPrice: 1799,
                    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
                    rating: 4.7,
                    reviews: 156
                },
                {
                    id: 104,
                    name: "HP Spectre x360",
                    price: 1199,
                    originalPrice: 1399,
                    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop",
                    rating: 4.5,
                    reviews: 203
                },
                {
                    id: 105,
                    name: "ASUS ZenBook Pro",
                    price: 1899,
                    originalPrice: 2099,
                    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&h=200&fit=crop",
                    rating: 4.6,
                    reviews: 134
                },
                {
                    id: 106,
                    name: "Surface Laptop Studio",
                    price: 1699,
                    originalPrice: 1899,
                    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&h=200&fit=crop",
                    rating: 4.4,
                    reviews: 167
                },
                {
                    id: 107,
                    name: "MacBook Pro 14 M3",
                    price: 2199,
                    originalPrice: 2399,
                    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
                    rating: 4.9,
                    reviews: 312
                },
                {
                    id: 108,
                    name: "Razer Blade 15",
                    price: 2299,
                    originalPrice: 2599,
                    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop",
                    rating: 4.3,
                    reviews: 98
                }
            ]
        },
        {
            name: "Smartphones",
            icon: <Smartphone className="h-6 w-6" />,
            products: [
                {
                    id: 201,
                    name: "iPhone 15 Pro",
                    price: 999,
                    originalPrice: 1099,
                    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
                    rating: 4.9,
                    reviews: 567
                },
                {
                    id: 202,
                    name: "Samsung Galaxy S24",
                    price: 899,
                    originalPrice: 999,
                    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop",
                    rating: 4.7,
                    reviews: 423
                },
                {
                    id: 203,
                    name: "Google Pixel 8",
                    price: 699,
                    originalPrice: 799,
                    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop",
                    rating: 4.6,
                    reviews: 289
                },
                {
                    id: 204,
                    name: "OnePlus 12",
                    price: 799,
                    originalPrice: 899,
                    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=200&fit=crop",
                    rating: 4.5,
                    reviews: 178
                },
                {
                    id: 205,
                    name: "iPhone 15 Pro Max",
                    price: 1199,
                    originalPrice: 1299,
                    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
                    rating: 4.9,
                    reviews: 745
                },
                {
                    id: 206,
                    name: "Samsung Galaxy S24 Ultra",
                    price: 1299,
                    originalPrice: 1399,
                    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop",
                    rating: 4.8,
                    reviews: 456
                },
                {
                    id: 207,
                    name: "Google Pixel 8 Pro",
                    price: 999,
                    originalPrice: 1099,
                    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=200&fit=crop",
                    rating: 4.7,
                    reviews: 234
                },
                {
                    id: 208,
                    name: "OnePlus 12 Pro",
                    price: 899,
                    originalPrice: 999,
                    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop",
                    rating: 4.6,
                    reviews: 156
                }
            ]
        },
        {
            name: "Headphones",
            icon: <Headphones className="h-6 w-6" />,
            products: [
                {
                    id: 301,
                    name: "AirPods Pro 2",
                    price: 249,
                    originalPrice: 279,
                    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=200&fit=crop",
                    rating: 4.8,
                    reviews: 678
                },
                {
                    id: 302,
                    name: "Sony WH-1000XM4",
                    price: 299,
                    originalPrice: 349,
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
                    rating: 4.7,
                    reviews: 445
                },
                {
                    id: 303,
                    name: "Bose QuietComfort",
                    price: 329,
                    originalPrice: 379,
                    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop",
                    rating: 4.6,
                    reviews: 334
                },
                {
                    id: 304,
                    name: "Sennheiser HD 660S",
                    price: 449,
                    originalPrice: 499,
                    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=200&fit=crop",
                    rating: 4.9,
                    reviews: 156
                },
                {
                    id: 305,
                    name: "AirPods Max",
                    price: 479,
                    originalPrice: 549,
                    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=200&fit=crop",
                    rating: 4.5,
                    reviews: 289
                },
                {
                    id: 306,
                    name: "Sony WH-1000XM5",
                    price: 399,
                    originalPrice: 449,
                    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop",
                    rating: 4.8,
                    reviews: 567
                },
                {
                    id: 307,
                    name: "Bose 700",
                    price: 349,
                    originalPrice: 399,
                    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=200&fit=crop",
                    rating: 4.6,
                    reviews: 234
                },
                {
                    id: 308,
                    name: "Audio-Technica ATH-M50x",
                    price: 149,
                    originalPrice: 169,
                    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=200&fit=crop",
                    rating: 4.7,
                    reviews: 456
                }
            ]
        },
        {
            name: "Gaming",
            icon: <GamepadIcon className="h-6 w-6" />,
            products: [
                {
                    id: 401,
                    name: "PlayStation 5",
                    price: 499,
                    originalPrice: 549,
                    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=200&fit=crop",
                    rating: 4.8,
                    reviews: 892
                },
                {
                    id: 402,
                    name: "Xbox Series X",
                    price: 499,
                    originalPrice: 549,
                    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=200&fit=crop",
                    rating: 4.7,
                    reviews: 723
                },
                {
                    id: 403,
                    name: "Steam Deck",
                    price: 399,
                    originalPrice: 449,
                    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop",
                    rating: 4.5,
                    reviews: 234
                },
                {
                    id: 404,
                    name: "Nintendo Switch OLED",
                    price: 349,
                    originalPrice: 379,
                    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
                    rating: 4.6,
                    reviews: 567
                },
                {
                    id: 405,
                    name: "PlayStation 5 Digital",
                    price: 399,
                    originalPrice: 449,
                    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=300&h=200&fit=crop",
                    rating: 4.7,
                    reviews: 445
                },
                {
                    id: 406,
                    name: "Xbox Series S",
                    price: 299,
                    originalPrice: 329,
                    image: "https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2b?w=300&h=200&fit=crop",
                    rating: 4.4,
                    reviews: 356
                },
                {
                    id: 407,
                    name: "Steam Deck OLED",
                    price: 549,
                    originalPrice: 599,
                    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop",
                    rating: 4.6,
                    reviews: 123
                },
                {
                    id: 408,
                    name: "Nintendo Switch Lite",
                    price: 199,
                    originalPrice: 229,
                    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
                    rating: 4.3,
                    reviews: 789
                }
            ]
        }
    ];

    return (
        <>
            <Head title="Gimme Electronics - Your Tech Store" />
            <AppLayout>
                {/* Hero Banner Section */}
                <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 px-4 pt-20 md:pt-32">
                    <div className="mx-auto max-w-6xl py-12">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation, Mousewheel]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            pagination={{
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet',
                                bulletActiveClass: 'swiper-pagination-bullet-active',
                            }}
                            navigation={true}
                            mousewheel={{
                                forceToAxis: true,
                                sensitivity: 0.1,
                                releaseOnEdges: true,
                                thresholdDelta: 40,
                                thresholdTime: 400,
                                eventsTarget: 'container',
                                invert: false,
                            }}
                            touchEventsTarget="container"
                            simulateTouch={true}
                            allowTouchMove={true}
                            touchRatio={1}
                            touchAngle={45}
                            grabCursor={true}
                            preventClicks={false}
                            preventClicksPropagation={false}
                            className="hero-swiper"
                        >
                            {featuredProducts.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <div className="grid items-center gap-8 lg:grid-cols-2 min-h-[450px] px-4">
                                        {/* Left Side - Text Content */}
                                        <div className="space-y-6 text-white pl-12 lg:pl-16">
                                            <div className="space-y-3">
                                                <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 text-sm font-medium">
                                                    {product.badge} • {product.highlight}
                                                </Badge>
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                                    {product.catchyText}
                                                </h1>
                                                <h2 className="text-xl md:text-2xl font-semibold text-blue-100">
                                                    {product.name}
                                                </h2>
                                                <p className="text-base md:text-lg text-blue-100 leading-relaxed">
                                                    {product.description}
                                                </p>
                                            </div>
                                            
                                            {/* Rating and Price */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="ml-2 text-base font-semibold">{product.rating}</span>
                                                        <span className="ml-1 text-blue-200">/ 5.0</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Heart className="h-4 w-4 text-red-400" />
                                                        <span className="text-blue-200 text-sm">Loved by customers</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl font-bold">${product.price}</span>
                                                    <span className="text-lg text-blue-200 line-through">
                                                        ${product.originalPrice}
                                                    </span>
                                                    <Badge className="bg-green-500 text-white hover:bg-green-600 px-2 py-1 text-xs">
                                                        Save ${product.originalPrice - product.price}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-base px-6 py-2">
                                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                                    Add to Cart
                                                </Button>
                                                <Button variant="outline" size="lg" className="text-slate-700 border-none bg-white/80 hover:bg-white/60 hover:text-slate-900 text-base px-6 py-2">
                                                    Learn More
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Right Side - Product Image */}
                                        <div className="relative flex justify-center">
                                            <div className="relative group">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full max-w-sm h-64 object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                                                
                                                {/* Floating Badge */}
                                                <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold shadow-lg text-sm">
                                                    {product.badge}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* Product Categories Section */}
                <section className="bg-gray-50 px-4 py-16">
                    <div className="mx-auto max-w-7xl">
                        {categories.map((category) => (
                            <div key={category.name} className="mb-16">
                                {/* Category Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                            {category.icon}
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                                    </div>
                                    <Link href={`/products?category=${category.name.toLowerCase()}`}>
                                        <Button variant="outline" className="group bg-white/80 hover:bg-gray-100 hover:scale-105 hover:shadow-lg text-gray-800 border-none hover:text-emerald-600 shadow-md">
                                            See More
                                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Products Row - Horizontally Scrollable */}
                                <div className="flex gap-6 overflow-x-auto pb-6 p-4 scroll-smooth">
                                    {category.products.map((product) => (
                                        <Card key={product.id} className="min-w-[280px] group hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200/50">
                                            <div className="relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-48 w-full object-cover"
                                                />
                                                {/* Heart icon for favorites */}
                                                <button className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                                                    <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                                                </button>
                                                {/* Shopping cart icon */}
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
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
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white px-4 py-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <h3 className="text-2xl font-bold text-emerald-400 mb-4">Gimme Electronics</h3>
                                <p className="text-gray-300 mb-4">
                                    Your trusted destination for the latest electronics and tech gadgets. 
                                    We bring you cutting-edge technology at unbeatable prices.
                                </p>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                                        <Zap className="h-3 w-3 mr-1" />
                                        Fast Shipping
                                    </Badge>
                                    <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                                        24/7 Support
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><Link href="/about" className="hover:text-emerald-400">About Us</Link></li>
                                    <li><Link href="/contact" className="hover:text-emerald-400">Contact</Link></li>
                                    <li><Link href="/shipping" className="hover:text-emerald-400">Shipping Info</Link></li>
                                    <li><Link href="/returns" className="hover:text-emerald-400">Returns</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Categories</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><Link href="/laptops" className="hover:text-emerald-400">Laptops</Link></li>
                                    <li><Link href="/smartphones" className="hover:text-emerald-400">Smartphones</Link></li>
                                    <li><Link href="/headphones" className="hover:text-emerald-400">Headphones</Link></li>
                                    <li><Link href="/gaming" className="hover:text-emerald-400">Gaming</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2025 Gimme Electronics. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </AppLayout>
        </>
    );
}
