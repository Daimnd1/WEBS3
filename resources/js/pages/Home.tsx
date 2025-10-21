import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import featuredProducts from '@/data/products/featured-products';
import categories from '@/data/products/products';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home() {
    return (
        <>
            <Head title="Gimme Electronics - Your Tech Store" />
            <AppLayout>
                {/* Hero Banner Section */}
                <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-300 px-2 sm:px-4 pt-20 md:pt-32">
                    <div className="mx-auto max-w-6xl py-8 sm:py-12">
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
                                    <div className="grid min-h-[400px] sm:min-h-[450px] items-center gap-4 sm:gap-8 px-2 sm:px-4 lg:grid-cols-2">
                                        {/* Left Side - Text Content */}
                                        <div className="space-y-3 sm:space-y-4 md:space-y-6 px-4 sm:px-8 lg:px-16">
                                            <div className="space-y-2 sm:space-y-3">
                                                <Badge className="bg-amber-400 text-xs sm:text-sm font-medium text-black hover:bg-amber-500">
                                                    {product.badge} •{' '}
                                                    {product.highlight}
                                                </Badge>
                                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-slate-100">
                                                    {product.catchyText}
                                                </h1>
                                                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-200">
                                                    {product.name}
                                                </h2>
                                                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-200">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* Rating and Price */}
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                                    <div className="flex items-center">
                                                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                                                        <span className="ml-1 sm:ml-2 text-sm sm:text-base font-semibold">
                                                            {product.rating}
                                                        </span>
                                                        <span className="ml-1 text-xs sm:text-sm text-blue-200">
                                                            / 5.0
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 sm:gap-2">
                                                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500" />
                                                        <span className="text-xs sm:text-sm text-blue-200">
                                                            Loved by customers
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                                    <span className="text-2xl sm:text-3xl font-bold">
                                                        ${product.price}
                                                    </span>
                                                    <span className="text-base sm:text-lg text-blue-200 line-through">
                                                        ${product.originalPrice}
                                                    </span>
                                                    <Badge className="bg-green-500 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-white hover:bg-green-600">
                                                        Save $
                                                        {product.originalPrice -
                                                            product.price}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row">
                                                <Button
                                                    size="lg"
                                                    className="bg-indigo-500 px-4 sm:px-6 py-2 text-sm sm:text-base text-slate-100 shadow-lg hover:bg-indigo-600"
                                                >
                                                    <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                    Add to Cart
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    className="border-white bg-transparent px-4 sm:px-6 py-2 text-sm sm:text-base text-white hover:bg-white hover:text-indigo-600"
                                                >
                                                    Learn More
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Right Side - Product Image */}
                                        <div className="relative hidden lg:flex justify-center">
                                            <div className="group relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-48 sm:h-56 md:h-64 w-full max-w-sm rounded-2xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>

                                                {/* Floating Badge */}
                                                <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 rounded-full bg-yellow-400 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-bold text-black shadow-lg">
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
                <section className="bg-gray-50 px-2 sm:px-4 py-8 sm:py-12 md:py-16">
                    <div className="mx-auto max-w-7xl">
                        {categories.map((category) => (
                            <div key={category.name} className="mb-8 sm:mb-12 md:mb-16">
                                {/* Category Header */}
                                <div className="mb-4 sm:mb-6 md:mb-8 flex items-center justify-between">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="rounded-lg bg-indigo-100 p-1.5 sm:p-2 text-indigo-600">
                                            {category.icon}
                                        </div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                            {category.name}
                                        </h2>
                                    </div>
                                    <Link
                                        href={`/products?category=${category.name.toLowerCase()}`}
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="group border-transparent bg-indigo-800 hover:bg-indigo-900 text-xs sm:text-sm"
                                        >
                                            <span className="hidden sm:inline">See More</span>
                                            <span className="sm:hidden">More</span>
                                            <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Products Row - Horizontally Scrollable */}
                                <div className="scrollbar-hide flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4">
                                    {category.products.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                        >
                                            <Card
                                                key={product.id}
                                                className="group min-w-[220px] sm:min-w-[260px] md:min-w-[280px] border-slate-200/50 bg-white/80 transition-all duration-300 hover:shadow-lg"
                                            >
                                                <div className="relative">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-48 sm:h-56 md:h-64 w-full rounded-xl object-cover"
                                                    />
                                                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full bg-white/90 p-1.5 sm:p-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                        <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                                                    </div>
                                                </div>
                                                <CardContent className="p-3 sm:p-4 text-slate-800">
                                                    <h3 className="mb-1.5 sm:mb-2 line-clamp-2 text-base sm:text-lg font-semibold text-slate-900">
                                                        {product.name}
                                                    </h3>
                                                    <div className="mb-2 sm:mb-3 flex items-center">
                                                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                                                        <span className="ml-1 text-xs sm:text-sm font-medium text-slate-700">
                                                            {product.rating}
                                                        </span>
                                                        <span className="ml-1 text-xs sm:text-sm text-slate-500">
                                                            ({product.reviews})
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="text-lg sm:text-xl font-bold text-indigo-600">
                                                                ${product.price}
                                                            </span>
                                                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-500 line-through">
                                                                $
                                                                {
                                                                    product.originalPrice
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </AppLayout>
        </>
    );
}
