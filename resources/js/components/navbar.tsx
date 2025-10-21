import { Link } from '@inertiajs/react';
import { Package, ShoppingCart, Star, UserCircle, Heart } from 'lucide-react';
import { useFavorites } from "@/lib/useFavorites";
const navbar = () => {
    const { ids } = useFavorites();
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
                <Link
          href={"/favorites"}
          className={`relative cursor-pointer rounded-lg p-2 transition-colors duration-200 hover:bg-indigo-50 ${
            ids.length > 0 ? "text-red-600" : "text-indigo-500"
          }`}
          title="Favorites"
        >
          <Heart size={24} />
          {ids.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium leading-4 text-white">
              {ids.length}
            </span>
          )}
          <span className="sr-only">Favorites</span>
        </Link>
            </div>
        </nav>
    );
};

export default navbar;
