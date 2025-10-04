import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ChevronRight,
    GamepadIcon,
    Headphones,
    Heart,
    Monitor,
    ShoppingCart,
    Smartphone,
    Star,
    Zap,
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home() {
    // Featured products for the banner
    const featuredProducts = [
        {
            id: 1,
            name: 'iPhone 15 Pro Max',
            price: 1199,
            originalPrice: 1399,
            image: 'https://media.power-cdn.net/images/h-4b8f6ed4dadd9804f8605e0db45c92ac/products/2668282/2668282_11_600x600_t_g.webp',
            rating: 4.9,
            badge: 'Featured',
            catchyText: 'Titanium. So strong. So light. So Pro.',
            description:
                'Experience the latest iPhone with revolutionary titanium design, advanced camera system, and A17 Pro chip.',
            highlight: 'Save $200',
        },
        {
            id: 2,
            name: 'MacBook Pro M3',
            price: 1999,
            originalPrice: 2299,
            image: 'https://www.power.dk/media/in3jlfv1/macbook-pro-m3-14.png?height=240&quality=80',
            rating: 4.8,
            badge: 'New Arrival',
            catchyText: 'Mind-blowing. Game-changing. Jaw-dropping.',
            description:
                'The most advanced MacBook Pro ever. With M3 chip for unprecedented performance and all-day battery life.',
            highlight: 'Limited Time Offer',
        },
        {
            id: 3,
            name: 'Sony WH-1000XM5',
            price: 399,
            originalPrice: 449,
            image: 'https://media.power-cdn.net/images/h-0d66ad6626ad377f43daeaf02b0127d2/products/1478246/1478246_1_600x600_t_g.webp',
            rating: 4.7,
            badge: 'Best Seller',
            catchyText: 'Silence the world. Amplify your music.',
            description:
                'Industry-leading noise canceling with exceptional sound quality and smart features for the ultimate listening experience.',
            highlight: 'Customer Favorite',
        },
    ];

    // Product categories with their respective products
    const categories = [
        {
            name: 'Laptops',
            icon: <Monitor className="h-6 w-6" />,
            products: [
                {
                    id: 101,
                    name: 'MacBook Air M2',
                    price: 1299,
                    originalPrice: 1499,
                    image: 'https://smvkt.com/cdn/shop/files/Apple-macbook-air-m2-13-spacegrey-1_grande.webp?v=1715679892',
                    rating: 4.8,
                    reviews: 245,
                },
                {
                    id: 102,
                    name: 'Dell XPS 13',
                    price: 999,
                    originalPrice: 1199,
                    image: 'https://media.power-cdn.net/images/h-cba1e2d294aac389e7b1994922696cf1/products/4091793/4091793_3_600x600_w_g.webp',
                    rating: 4.6,
                    reviews: 189,
                },
                {
                    id: 103,
                    name: 'ThinkPad X1 Carbon',
                    price: 1599,
                    originalPrice: 1799,
                    image: 'https://media.power-cdn.net/images/h-4d66e53000b630f5a07c1652f1e937bd/products/2297401/2297401_5_600x600_t_g.webp',
                    rating: 4.7,
                    reviews: 156,
                },
                {
                    id: 104,
                    name: 'HP Spectre x360',
                    price: 1199,
                    originalPrice: 1399,
                    image: 'https://media.power-cdn.net/images/h-a169640802d31c8f1a4640b4b8f22cdf/products/1122064/1122064_5_600x600_w_g.webp',
                    rating: 4.5,
                    reviews: 203,
                },
                {
                    id: 105,
                    name: 'ASUS ZenBook Pro',
                    price: 1899,
                    originalPrice: 2099,
                    image: 'https://dlcdnwebimgs.asus.com/gain/096bd769-b48d-41ea-9eb5-7d305aa8a6fe/',
                    rating: 4.6,
                    reviews: 134,
                },
                {
                    id: 106,
                    name: 'Surface Laptop Studio',
                    price: 1699,
                    originalPrice: 1899,
                    image: 'https://media.power-cdn.net/images/h-94e42081b5bcf8e840b62f408c387d8a/products/2570591/2570591_8_600x600_t_g.webp',
                    rating: 4.4,
                    reviews: 167,
                },
                {
                    id: 107,
                    name: 'MacBook Pro 14 M3',
                    price: 2199,
                    originalPrice: 2399,
                    image: 'https://www.power.dk/media/in3jlfv1/macbook-pro-m3-14.png?height=240&quality=80',
                    rating: 4.9,
                    reviews: 312,
                },
                {
                    id: 108,
                    name: 'Razer Blade 15',
                    price: 2299,
                    originalPrice: 2599,
                    image: 'https://media.power-cdn.net/images/h-b60fdb3aee88937e915fb8b0b2fd603c/products/1197251/1197251_1_600x600_t_g.webp',
                    rating: 4.3,
                    reviews: 98,
                },
            ],
        },
        {
            name: 'Smartphones',
            icon: <Smartphone className="h-6 w-6" />,
            products: [
                {
                    id: 201,
                    name: 'iPhone 15 Pro',
                    price: 999,
                    originalPrice: 1099,
                    image: 'https://media.power-cdn.net/images/h-a23cdf386fee61e1ba4b7bd31eeec07e/products/2668264/2668264_10_600x600_t_g.webp',
                    rating: 4.9,
                    reviews: 567,
                },
                {
                    id: 202,
                    name: 'Samsung Galaxy S24',
                    price: 899,
                    originalPrice: 999,
                    image: 'https://media.power-cdn.net/images/h-a23cdf386fee61e1ba4b7bd31eeec07e/products/2668264/2668264_10_600x600_t_g.webp',
                    rating: 4.7,
                    reviews: 423,
                },
                {
                    id: 203,
                    name: 'Google Pixel 8',
                    price: 699,
                    originalPrice: 799,
                    image: 'https://roobotech.com.au/cdn/shop/files/Pixel8obsidian.jpg?v=1714801573',
                    rating: 4.6,
                    reviews: 289,
                },
                {
                    id: 204,
                    name: 'OnePlus 12',
                    price: 799,
                    originalPrice: 899,
                    image: 'https://jo-cell.com/cdn/shop/files/oneplus-12-16gb512gb.webp?v=1713683334',
                    rating: 4.5,
                    reviews: 178,
                },
                {
                    id: 205,
                    name: 'iPhone 15 Pro Max',
                    price: 1199,
                    originalPrice: 1299,
                    image: 'https://cdn.cdon.com/media-dynamic/images/product/cloud/store/CellPhones/000/188/453/689/188453689-320251677-11453-org.jpg?cache=133784582428524263&imWidth=600',
                    rating: 4.9,
                    reviews: 745,
                },
                {
                    id: 206,
                    name: 'Samsung Galaxy S24 Ultra',
                    price: 1299,
                    originalPrice: 1399,
                    image: 'https://media.power-cdn.net/images/h-5d11250f3965ee480635750d742d7301/products/2954969/2954969_28_600x600_t_g.webp',
                    rating: 4.8,
                    reviews: 456,
                },
                {
                    id: 207,
                    name: 'Google Pixel 8 Pro',
                    price: 999,
                    originalPrice: 1099,
                    image: 'https://cdn.cdon.com/media-dynamic/images/product/cloud/store/Telephony/000/150/520/434/150520434-288031218-11453-org.jpg?cache=133498943077644786&imWidth=600',
                    rating: 4.7,
                    reviews: 234,
                },
                {
                    id: 208,
                    name: 'OnePlus 12 Pro',
                    price: 899,
                    originalPrice: 999,
                    image: 'https://dv9dhd03d71d4.cloudfront.net/eyJidWNrZXQiOiJwcm9kLXd3dy1hc3NldHMtcGVyZmVjdHJlYyIsImtleSI6ImltYWdlcy9wcm9kdWN0cy9zbWFydHBob25lcy9QZXJmZWN0UmVjX1Bob25lX09uZVBsdXMtMTIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2MDAsImZpdCI6ImNvdmVyIn19fQ==',
                    rating: 4.6,
                    reviews: 156,
                },
            ],
        },
        {
            name: 'Headphones',
            icon: <Headphones className="h-6 w-6" />,
            products: [
                {
                    id: 301,
                    name: 'AirPods Pro 2',
                    price: 249,
                    originalPrice: 279,
                    image: 'https://media.power-cdn.net/images/h-4815615e08ef1675c08a259bdf10e29e/products/1804024/1804024_3_600x600_w_g.webp',
                    rating: 4.8,
                    reviews: 678,
                },
                {
                    id: 302,
                    name: 'Sony WH-1000XM4',
                    price: 299,
                    originalPrice: 349,
                    image: 'https://media.power-cdn.net/images/h-94536e7672c3bd470375c23b3d98d16f/products/1106906/1106906_15_600x600_t_g.webp',
                    rating: 4.7,
                    reviews: 445,
                },
                {
                    id: 303,
                    name: 'Bose QuietComfort',
                    price: 329,
                    originalPrice: 379,
                    image: 'https://dantell.dk/images/Bose-QuietComfort-45-black-1.jpeg',
                    rating: 4.6,
                    reviews: 334,
                },
                {
                    id: 304,
                    name: 'Sennheiser HD 660S',
                    price: 449,
                    originalPrice: 499,
                    image: 'https://media.power-cdn.net/images/h-e28cad0af55de194acba97576838f6fe/products/1057166/1057166_7_600x600_t_g.webp',
                    rating: 4.9,
                    reviews: 156,
                },
                {
                    id: 305,
                    name: 'AirPods Max',
                    price: 479,
                    originalPrice: 549,
                    image: 'https://media.power-cdn.net/images/h-1b5db35a3af76265cca2f94e86cdec87/products/3614402/3614402_4_600x600_w_g.webp',
                    rating: 4.5,
                    reviews: 289,
                },
                {
                    id: 306,
                    name: 'Sony WH-1000XM5',
                    price: 399,
                    originalPrice: 449,
                    image: 'https://media.power-cdn.net/images/h-0d66ad6626ad377f43daeaf02b0127d2/products/1478246/1478246_1_600x600_t_g.webp',
                    rating: 4.8,
                    reviews: 567,
                },
                {
                    id: 307,
                    name: 'Bose 700',
                    price: 349,
                    originalPrice: 399,
                    image: 'https://media.power-cdn.net/images/h-759e54aca43d5ce1f29afe13f1ba32d0/products/1019225/1019225_4_600x600_t_g.webp',
                    rating: 4.6,
                    reviews: 234,
                },
                {
                    id: 308,
                    name: 'Audio-Technica ATH-M50x',
                    price: 149,
                    originalPrice: 169,
                    image: 'https://r2.gear4music.com/media/16/165126/600/preview.jpg',
                    rating: 4.7,
                    reviews: 456,
                },
            ],
        },
        {
            name: 'Gaming',
            icon: <GamepadIcon className="h-6 w-6" />,
            products: [
                {
                    id: 401,
                    name: 'PlayStation 5',
                    price: 499,
                    originalPrice: 549,
                    image: 'https://media.power-cdn.net/images/h-9be3b7b73ff7f7117da472fd6e29602f/products/2856454/2856454_1_600x600_w_g.webp',
                    rating: 4.8,
                    reviews: 892,
                },
                {
                    id: 402,
                    name: 'Xbox Series X',
                    price: 499,
                    originalPrice: 549,
                    image: 'https://kosmosrenew.dk/cdn/shop/files/xbox-series-x-kosmos-renew-60987_grande.png?v=1746705894',
                    rating: 4.7,
                    reviews: 723,
                },
                {
                    id: 403,
                    name: 'Steam Deck',
                    price: 399,
                    originalPrice: 449,
                    image: 'https://kosmosrenew.dk/cdn/shop/files/xbox-series-x-kosmos-renew-60987_grande.png?v=1746705894',
                    rating: 4.5,
                    reviews: 234,
                },
                {
                    id: 404,
                    name: 'Nintendo Switch OLED',
                    price: 349,
                    originalPrice: 379,
                    image: 'https://cdn.lomax.dk/images/t_item_large/f_auto/v1719652019/produkter/70205130_1/nintendo-switch-oled-64gb-hvid-1.jpg',
                    rating: 4.6,
                    reviews: 567,
                },
                {
                    id: 405,
                    name: 'PlayStation 5 Digital',
                    price: 399,
                    originalPrice: 449,
                    image: 'https://zrep.dk/media/catalog/product/cache/8ce56cb874d008a231e9732ece31296b/u/n/untitled.png',
                    rating: 4.7,
                    reviews: 445,
                },
                {
                    id: 406,
                    name: 'Xbox Series S',
                    price: 299,
                    originalPrice: 329,
                    image: 'https://media.power-cdn.net/images/h-c443267b1d20c1a17bc4ef505653f141/products/2664289/2664289_5_600x600_w_g.webp',
                    rating: 4.4,
                    reviews: 356,
                },
                {
                    id: 407,
                    name: 'Steam Deck OLED',
                    price: 549,
                    originalPrice: 599,
                    image: 'https://techvers.eu/wp-content/uploads/2023/11/steam_deck_oled_512gb-1.jpg',
                    rating: 4.6,
                    reviews: 123,
                },
                {
                    id: 408,
                    name: 'Nintendo Switch Lite',
                    price: 199,
                    originalPrice: 229,
                    image: 'https://techvers.eu/wp-content/uploads/2023/11/steam_deck_oled_512gb-1.jpg',
                    rating: 4.3,
                    reviews: 789,
                },
            ],
        },
    ];

    return (
        <>
            <Head title="Gimme Electronics - Your Tech Store" />
            <AppLayout>
                {/* Hero Banner Section */}
                <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-300 px-4 pt-20 md:pt-32">
                    <div className="mx-auto max-w-6xl py-12">
                        <Swiper
                            modules={[
                                Autoplay,
                                Pagination,
                                Navigation,
                                Mousewheel,
                            ]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            pagination={{
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet',
                                bulletActiveClass:
                                    'swiper-pagination-bullet-active',
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
                                    <div className="grid min-h-[450px] items-center gap-8 px-4 lg:grid-cols-2">
                                        {/* Left Side - Text Content */}
                                        <div className="space-y-6 pl-12 lg:pl-16">
                                            <div className="space-y-3">
                                                <Badge className="bg-amber-400 text-sm font-medium text-black hover:bg-amber-500">
                                                    {product.badge} •{' '}
                                                    {product.highlight}
                                                </Badge>
                                                <h1 className="text-4xl leading-tight font-bold text-slate-100 md:text-5xl">
                                                    {product.catchyText}
                                                </h1>
                                                <h2 className="text-xl font-semibold text-slate-200 md:text-2xl">
                                                    {product.name}
                                                </h2>
                                                <p className="text-base leading-relaxed text-slate-200 md:text-lg">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* Rating and Price */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                        <span className="ml-2 text-base font-semibold">
                                                            {product.rating}
                                                        </span>
                                                        <span className="ml-1 text-blue-200">
                                                            / 5.0
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Heart className="h-4 w-4 text-rose-500" />
                                                        <span className="text-sm text-blue-200">
                                                            Loved by customers
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl font-bold">
                                                        ${product.price}
                                                    </span>
                                                    <span className="text-lg text-blue-200 line-through">
                                                        ${product.originalPrice}
                                                    </span>
                                                    <Badge className="bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600">
                                                        Save $
                                                        {product.originalPrice -
                                                            product.price}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <Button
                                                    size="lg"
                                                    className="bg-indigo-500 px-6 py-2 text-base text-slate-100 shadow-lg hover:bg-indigo-600"
                                                >
                                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                                    Add to Cart
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    className="border-white bg-transparent px-6 py-2 text-base text-white hover:bg-white hover:text-indigo-600"
                                                >
                                                    Learn More
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Right Side - Product Image */}
                                        <div className="relative flex justify-center">
                                            <div className="group relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-64 w-full max-w-sm rounded-2xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>

                                                {/* Floating Badge */}
                                                <div className="absolute -top-3 -right-3 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow-lg">
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
                                <div className="mb-8 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                                            {category.icon}
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">
                                            {category.name}
                                        </h2>
                                    </div>
                                    <Link
                                        href={`/category/${category.name.toLowerCase()}`}
                                    >
                                        <Button
                                            variant="outline"
                                            className="group"
                                        >
                                            See More
                                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Products Row - Horizontally Scrollable */}
                                <div className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth pb-4">
                                    {category.products.map((product) => (
                                        <Card
                                            key={product.id}
                                            className="group min-w-[280px] border-slate-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-64 w-full rounded-xl object-cover"
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
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
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
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 px-4 py-12 text-white">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <h3 className="mb-4 text-2xl font-bold text-indigo-400">
                                    Gimme Electronics
                                </h3>
                                <p className="mb-4 text-gray-300">
                                    Your trusted destination for the latest
                                    electronics and tech gadgets. We bring you
                                    cutting-edge technology at unbeatable
                                    prices.
                                </p>
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
        </>
    );
}
