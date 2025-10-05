import { Link } from '@inertiajs/react';
import { Package, ShoppingCart, Star, UserCircle } from 'lucide-react';

const navbar = () => {
    return (
        <nav className="fixed top-0 z-50 flex h-16 w-screen flex-row items-center justify-between bg-gradient-to-b from-white/60 to-white/30 px-4 backdrop-blur-sm md:h-24 md:px-8">
            <Link href="/">
                <p className="text-xl font-bold text-slate-800 md:text-2xl">
                    Gimme
                </p>
            </Link>
            <input
                type="text"
                placeholder="Search for products..."
                className="mx-6 hidden w-full max-w-4xl rounded-full border-2 border-slate-200 bg-white/30 px-4 py-2 text-slate-700 transition-colors duration-200 placeholder:font-light placeholder:text-neutral-500 focus-visible:border-indigo-500 focus-visible:outline-none md:block"
            />
            <div className="flex gap-4">
                <Link
                    href={'/products'}
                    className="cursor-pointer rounded-lg p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700"
                    title="All Products"
                >
                    <Package size={24} />
                </Link>
                <Link
                    href={'/'}
                    className="cursor-pointer rounded-lg p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700"
                >
                    <Star size={24} />
                </Link>
                <Link
                    href={'/cart'}
                    className="cursor-pointer rounded-lg p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700"
                >
                    <ShoppingCart size={24} />
                </Link>
                <Link
                    href={'/login'}
                    className="cursor-pointer rounded-lg p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700"
                >
                    <UserCircle size={24} />
                </Link>
            </div>
        </nav>
    );
};

export default navbar;
