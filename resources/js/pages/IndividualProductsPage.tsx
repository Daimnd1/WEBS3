import { allProducts } from '@/data/products/products';
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

            <section className="grid justify-center bg-slate-100 p-4 md:p-8 lg:p-12">
                <article className="mt-16 grid h-fit max-w-3xl rounded-xl bg-slate-50 p-6 pb-12 text-black shadow-2xl lg:max-w-6xl lg:grid-cols-2">
                    <section>
                        <img
                            src={product.image}
                            alt={`${product.name} main image`}
                            className="h-full w-full rounded-lg object-contain"
                        />
                    </section>
                    <section className="grid content-center">
                        <h1 className="md: text-3xl text-slate-800">
                            {product.name}
                        </h1>
                        <div className="flex items-center justify-between gap-2">
                            <div className="relative mt-2 flex items-center gap-2">
                                <span className="text-3xl font-bold text-indigo-600">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-base text-gray-500 line-through">
                                    ${product.originalPrice}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-600">
                                    {product.rating}
                                </span>
                                <Star className="col-span-2 h-5 w-5 fill-amber-400 text-amber-400" />
                            </div>
                        </div>
                        <div className="mt-1 text-base text-slate-500">
                            <span className='hover:underline hover:text-indigo-600'> 
                                <a href=''>Reviews: {product.reviews}</a>
                            </span>
                        </div>

                        <h2 className="mt-2 text-xl font-semibold text-slate-700">
                            Specifications
                        </h2>
                        <ul className="mt-1 grid gap-1 rounded-lg text-slate-600">
                            {[
                                'Placeholder1',
                                'Placeholder2',
                                'Placeholder3',
                                'Placeholder4',
                                'Placeholder5',
                                'Placeholder6',
                            ].map((item) => (
                                <li
                                    className="border-b border-slate-200 pb-1 last:border-b-0"
                                    key={item}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            <h2 className="mb-2 text-xl font-semibold text-slate-700">
                                Purchase options
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        className="rounded-md border-2 border-slate-200 px-2 py-1 transition-colors duration-300 hover:border-indigo-400"
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
                                    className="relative z-0 w-full cursor-pointer overflow-hidden rounded-md bg-indigo-500 py-1.5 text-white transition-transform duration-300 ease-bouncy after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:origin-right after:scale-x-0 after:bg-indigo-700 after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left hover:after:scale-x-100 active:scale-90"
                                >
                                    Add to Cart
                                </button>
                                
                            </div>

                            <div className="flex items-center gap-4 mt-4"> 
                                <button
                                    type="button"
                                    className="relative z-0 w-full cursor-pointer overflow-hidden rounded-md bg-indigo-500 py-1.5 text-white transition-transform duration-300 ease-bouncy after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:origin-right after:scale-x-0 after:bg-indigo-700 after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left hover:after:scale-x-100 active:scale-90"
                                >
                                    Add review
                                </button>
                            
                                <button
                                    type="button"
                                    className="relative z-0 w-full cursor-pointer overflow-hidden rounded-md bg-indigo-500 py-1.5 text-white transition-transform duration-300 ease-bouncy after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:origin-right after:scale-x-0 after:bg-indigo-700 after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left hover:after:scale-x-100 active:scale-90"
                                >
                                    Add to Favorites
                                </button>
                            </div>
                        </div>
                    </section>
                    <article className='col-span-full'>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-700">
                            Description/ Product overview
                        </h2>
                        <p className='col-span-full'>
                            Placeholder text: The old lighthouse keeper, Elias, watched the churning 
                            expanse of the Atlantic as it swallowed the last sliver of the setting sun. 
                            For forty years, the rhythm of the waves and the dependable swing of the lamp had 
                            been the only constants in his life, a silent, comforting counterpoint to the distant 
                            clamor of the mainland. He often pondered the countless ships his beam had guided, vessels 
                            carrying stories, cargo, and hopes he would never know, yet felt intrinsically linked to. 
                            Tonight, however, the air held a strange, brittle silence, an unnatural pause before an 
                            impending storm. He checked the brass mechanism one last time, the gears humming with meticulous 
                            precision. Outside, a lone gull cried out, its voice thin against the sudden whip of the rising wind. 
                            Elias pulled his heavy woolen cardigan tighter, his thoughts drifting to a faded photograph tucked 
                            into his breast pocket—a reminder of a life he had chosen to leave behind for the solitary, yet profound, 
                            duty of the beacon. The rain began, tapping a rapid, urgent beat against the thick glass of the lantern room, 
                            signaling the start of another long, vigilant night.</p>
                    </article>
                </article>
            </section>
            
        </AppLayout>
    );
}
