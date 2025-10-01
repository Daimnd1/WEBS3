import { Link } from '@inertiajs/react';
import { ShoppingCart, Star, UserCircle } from 'lucide-react';

const navbar = () => {
    return (
        <nav className="fixed top-0 flex h-16 w-screen flex-row items-center justify-between border-b border-slate-200/50 bg-white/80 backdrop-blur-md px-4 shadow-md z-50 md:h-24 md:px-8">
            <Link href="/">
                <p className="text-xl font-bold text-slate-800 md:text-2xl">
                    Gimme
                </p>
            </Link>
            <input
                type="text"
                placeholder="Search for products..."
                className="mx-6 hidden w-full max-w-4xl rounded-full border-2 border-slate-200 px-4 py-2 text-slate-700 transition-colors duration-200 placeholder:font-light placeholder:text-neutral-400 focus-visible:border-emerald-500 focus-visible:outline-none md:block"
            />
            <div className="flex gap-4">
                <Link
                    href={'/'}
                    className="cursor-pointer rounded-lg p-2 text-emerald-500 transition-colors duration-200 hover:text-emerald-700"
                >
                    <Star size={24} />
                </Link>
                <Link
                    href={'/'}
                    className="cursor-pointer rounded-lg p-2 text-emerald-500 transition-colors duration-200 hover:text-emerald-700"
                >
                    <ShoppingCart size={24} />
                </Link>
                <Link
                    href={'/'}
                    className="cursor-pointer rounded-lg p-2 text-emerald-500 transition-colors duration-200 hover:text-emerald-700"
                >
                    <UserCircle size={24} />
                </Link>
            </div>
        </nav>
    );
};

export default navbar;
