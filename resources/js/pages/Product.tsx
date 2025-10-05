import { allProducts } from '@/data/products';
import AppLayout from '@/layouts/app-layout';
import { Star } from 'lucide-react';

interface ProductPageProps {
    productId: number;
}

export default function ProductPage({ productId }: ProductPageProps) {
    const id = Number(productId);
    const product = allProducts.find((product) => product.id === id);

    if (!product) {
        return (
            <AppLayout>
                <h1>Product not found</h1>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <head>
                <title>{product.name}</title>
            </head>

            <main className="min-h-screen bg-white p-4 md:p-8 lg:p-12">
                <article className="grid grid-cols-1 gap-6 rounded-xl bg-white/80 p-6 pt-10 pb-50 text-black shadow-2xl lg:grid-cols-4">
                    <section className="space-y-4 lg:col-span-2">
                        <header className="mb-4 bg-white/80 pt-10">
                            <h1 className="text-3xl font-bold text-black">
                                {product.name}
                            </h1>
                        </header>
                        <figure>
                            <img
                                src={product.image}
                                alt={'${product.name} main image'}
                                className="h-full w-full rounded-lg object-cover"
                            />
                        </figure>
                    </section>

                    <section className="grid grid-cols-2 grid-rows-1 gap-6 pt-22 lg:col-span-2">
                        {/* Price & rating */}
                        <div className="col-span-2 row-span-1 rounded-lg p-4 text-black shadow-md">
                            <h2 className="mb-2 text-xl font-semibold">
                                Price & Rating
                            </h2>
                            <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                                <div className="mb-2 flex items-center space-x-3 md:mb-0">
                                    <span className="text-2xl font-bold text-indigo-600">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="text-base text-gray-500 line-through">
                                        ${product.originalPrice}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 text-xl text-gray-700">
                                    <span className="font-medium">
                                        {product.rating}
                                    </span>
                                    <Star className="col-span-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>|</span>
                                    <span>Reviews: {product.reviews}</span>
                                </div>
                            </div>
                        </div>

                        <section className="col-span-full space-y-4 md:col-span-1">
                            <div className="rounded-lg p-2 shadow-inner">
                                <h2 className="mb-2 w-100 text-xl font-semibold">
                                    Short description
                                </h2>
                                <p className="text-l mb-2 w-100">
                                    placeholder.
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="rounded-lg p-2 shadow-inner">
                                <h2 className="mb-2 text-xl font-semibold">
                                    Specifications
                                </h2>
                                <dl>
                                    <dt>!Placeholder1!</dt>
                                    <dt>!Placeholder2!</dt>
                                    <dt>!Placeholder3!</dt>
                                </dl>
                            </div>
                        </section>

                        {/* Purchase Actions */}
                        <section className="col-span-2 rounded-lg bg-white p-4 shadow-inner md:col-span-1">
                            <h2 className="mb-2 text-xl font-semibold">
                                Purchase options
                            </h2>
                            <div className="text-l">
                                <label htmlFor="quantity">Quantity:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    max="10"
                                    defaultValue="1"
                                />
                            </div>

                            <button
                                type="button"
                                className="mb-2 w-full bg-indigo-600 text-white hover:bg-indigo-500"
                            >
                                Add to Cart
                            </button>
                            <button
                                type="button"
                                className="mb-2 w-full bg-indigo-600 text-white hover:bg-indigo-500"
                            >
                                Add to Favorites
                            </button>
                        </section>
                    </section>
                </article>
            </main>
        </AppLayout>
    );
}