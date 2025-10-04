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
import categories from '@/data/products/products';
import featuredProducts from '@/data/products/featured-products';

export default function Home() {
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
