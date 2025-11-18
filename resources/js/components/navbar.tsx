import { Link, usePage } from '@inertiajs/react';
import { Package, ShoppingCart, Star, UserCircle, Heart, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useFavorites } from "@/lib/useFavorites";
import Dropdown from '@/components/Dropdown';
import { Auth } from '@/types';

const navbar = () => {
    const { ids } = useFavorites();
    const { auth } = usePage().props as unknown as { auth: Auth };
    return (
        <nav className="fixed top-0 z-50 flex h-14 sm:h-16 md:h-20 lg:h-24 w-screen flex-row items-center justify-between bg-gradient-to-b from-white/60 to-white/30 px-3 sm:px-4 md:px-6 lg:px-8 backdrop-blur-sm">
            <Link href="/">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
                    Gimme
                </p>
            </Link>
            <input
                type="text"
                placeholder="Search for products..."
                className="mx-3 sm:mx-4 md:mx-6 hidden w-full max-w-4xl rounded-full border-2 border-slate-200 bg-white/30 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-slate-700 transition-colors duration-200 placeholder:font-light placeholder:text-neutral-500 focus-visible:border-indigo-500 focus-visible:outline-none md:block"
            />
            <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                <Link
                    href={'/products'}
                    className="cursor-pointer rounded-lg p-1.5 sm:p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700 hover:bg-indigo-50"
                    title="All Products"
                >
                    <Package size={20} className="sm:w-6 sm:h-6" />
                </Link>
                <Link
                    href={'/cart'}
                    className="cursor-pointer rounded-lg p-1.5 sm:p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700 hover:bg-indigo-50"
                    title="Shopping Cart"
                >
                    <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
                </Link>
                {auth.isAdmin && (
                    <Link
                        href={route('admin.dashboard')}
                        className="cursor-pointer rounded-lg p-1.5 sm:p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700 hover:bg-indigo-50"
                        title="Admin Dashboard"
                    >
                        <LayoutDashboard size={20} className="sm:w-6 sm:h-6" />
                    </Link>
                )}
                {auth.user ? (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 cursor-pointer rounded-lg p-1.5 sm:p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700 hover:bg-indigo-50"
                                title="Account"
                            >
                                <UserCircle size={20} className="sm:w-6 sm:h-6" />
                                <ChevronDown size={14} className="sm:w-4 sm:h-4" />
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    <Link
                        href={'/login'}
                        className="cursor-pointer rounded-lg p-1.5 sm:p-2 text-indigo-500 transition-colors duration-200 hover:text-indigo-700 hover:bg-indigo-50"
                        title="Login"
                    >
                        <UserCircle size={20} className="sm:w-6 sm:h-6" />
                    </Link>
                )}
                <Link
          href={"/favorites"}
          className={`relative cursor-pointer rounded-lg p-1.5 sm:p-2 transition-colors duration-200 hover:bg-indigo-50 ${
            ids.length > 0 ? "text-red-600" : "text-indigo-500"
          }`}
          title="Favorites"
        >
          <Heart size={20} className="sm:w-6 sm:h-6" />
          {ids.length > 0 && (
            <span className="absolute -right-1 -top-1 sm:-right-1.5 sm:-top-1.5 flex h-4 sm:h-5 min-w-4 sm:min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] sm:text-[10px] font-medium leading-4 text-white">
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
