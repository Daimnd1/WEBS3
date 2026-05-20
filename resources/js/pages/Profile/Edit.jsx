import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { useFavorites } from '@/lib/FavoritesProvider';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const statusColors = {
    PENDING:    'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    SHIPPED:    'bg-indigo-100 text-indigo-800',
    DELIVERED:  'bg-green-100 text-green-800',
    CANCELLED:  'bg-red-100 text-red-800',
};

function ChevronIcon({ open }) {
    return (
        <svg
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );
}

export default function Edit({ auth, mustVerifyEmail, status, orders = [], products = [] }) {
    const user = auth?.user;
    const { ids: favoriteIds } = useFavorites();
    const [openSection, setOpenSection] = useState(null);
    const [openOrderId, setOpenOrderId] = useState(null);

    const toggleOrder = (id) => setOpenOrderId(prev => prev === id ? null : id);

    const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

    const toggle = (section) => setOpenSection(prev => prev === section ? null : section);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="grid grid-cols-1 justify-center gap-6 bg-slate-100 px-3 py-20 *:max-w-2xl sm:px-8 md:px-12 lg:grid-cols-2 lg:px-24 lg:py-36 xl:px-32 2xl:gap-12 2xl:px-56">
                {/* Left sidebar */}
                <section className="flex h-fit flex-col items-center space-y-6 rounded-xl bg-white p-4 shadow sm:rounded-lg sm:p-8 lg:sticky lg:top-32">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white">
                            {getInitials(user?.name)}
                        </div>
                    </div>

                    {/* Name + email */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                        <p className="mt-1 text-sm text-gray-500">{user?.email || 'email@example.com'}</p>
                    </div>

                    {/* Quick links */}
                    <div className="w-full space-y-2 pt-4">

                        {/* Favourites */}
                        <div className="rounded-lg border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggle('favorites')}
                                className="group flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
                            >
                                <span className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="font-medium text-gray-700">My Favourites</span>
                                    {favoriteProducts.length > 0 && (
                                        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                                            {favoriteProducts.length}
                                        </span>
                                    )}
                                </span>
                                <ChevronIcon open={openSection === 'favorites'} />
                            </button>

                            {openSection === 'favorites' && (
                                <div className="border-t border-gray-100 divide-y divide-gray-100 max-h-72 overflow-y-auto">
                                    {favoriteProducts.length === 0 ? (
                                        <p className="px-4 py-4 text-sm text-gray-400 text-center">No favourites yet.</p>
                                    ) : (
                                        favoriteProducts.map(p => (
                                            <Link
                                                key={p.id}
                                                href={route('product.show', p.id)}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                            >
                                                {p.image ? (
                                                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex-shrink-0" />
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                                                    <p className="text-xs text-gray-500">${p.price}</p>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Orders */}
                        <div className="rounded-lg border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggle('orders')}
                                className="group flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
                            >
                                <span className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="font-medium text-gray-700">My Orders</span>
                                    {orders.length > 0 && (
                                        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                                            {orders.length}
                                        </span>
                                    )}
                                </span>
                                <ChevronIcon open={openSection === 'orders'} />
                            </button>

                            {openSection === 'orders' && (
                                <div className="border-t border-gray-100 divide-y divide-gray-100 max-h-72 overflow-y-auto">
                                    {orders.length === 0 ? (
                                        <p className="px-4 py-4 text-sm text-gray-400 text-center">No orders yet.</p>
                                    ) : (
                                        orders.map(o => (
                                            <div key={o.id} className="border-b border-gray-100 last:border-0">
                                                {/* Order header row — click to expand */}
                                                <button
                                                    onClick={() => toggleOrder(o.id)}
                                                    className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                                >
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {o.created_at} · ${Number(o.total).toFixed(2)}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            {o.items.length} product{o.items.length !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[o.status] ?? 'bg-gray-100 text-gray-700'}`}>
                                                            {o.status}
                                                        </span>
                                                        <ChevronIcon open={openOrderId === o.id} />
                                                    </div>
                                                </button>

                                                {/* Order items — shown when expanded */}
                                                {openOrderId === o.id && (
                                                    <div className="bg-gray-50 divide-y divide-gray-100 px-4 pb-2">
                                                        {o.items.map((item, i) => (
                                                            <div key={i} className="flex items-center gap-3 py-2">
                                                                {item.image ? (
                                                                    <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                                                                ) : (
                                                                    <div className="h-10 w-10 rounded-lg bg-gray-200 flex-shrink-0" />
                                                                )}
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {item.quantity} × ${Number(item.unit_price).toFixed(2)}
                                                                    </p>
                                                                </div>
                                                                <p className="text-sm font-semibold text-gray-900 flex-shrink-0">
                                                                    ${(item.quantity * item.unit_price).toFixed(2)}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cart link */}
                        <Link
                            href="/cart"
                            className="group flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50"
                        >
                            <span className="flex items-center gap-3">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="font-medium text-gray-700">My Cart</span>
                            </span>
                            <svg className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </section>

                {/* Right: forms */}
                <section className="grid gap-6 2xl:gap-12">
                    <div className="rounded-xl bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
