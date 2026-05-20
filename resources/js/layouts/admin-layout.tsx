import { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Package, ShoppingBag, Users, MessageSquare, ChevronRight } from 'lucide-react';
import Navbar from '@/components/navbar';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, exact: false },
    { label: 'Users', href: '/admin/users', icon: Users, exact: false },
    { label: 'Support', href: '/admin/support', icon: MessageSquare, exact: false },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex pt-14 sm:pt-16 md:pt-20 lg:pt-24">
                {/* Sidebar */}
                <aside className="fixed left-0 top-14 sm:top-16 md:top-20 lg:top-24 bottom-0 w-56 bg-white border-r border-gray-200 overflow-y-auto z-40">
                    <div className="p-4">
                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
                            Admin Panel
                        </p>
                        <nav className="space-y-0.5">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.exact
                                    ? url === item.href || url.startsWith(item.href + '?')
                                    : url.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon size={17} />
                                        <span>{item.label}</span>
                                        {isActive && <ChevronRight size={13} className="ml-auto text-indigo-400" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main content */}
                <main className="ml-56 flex-1 min-h-[calc(100vh-6rem)] p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
