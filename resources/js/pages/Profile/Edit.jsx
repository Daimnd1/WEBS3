import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const user = auth?.user;

    // Get initials for fallback avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Quick links data
    const quickLinks = [
        {
            label: 'My Favourites',
            href: '',
            iconPath:
                'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        },
        {
            label: 'My Orders',
            href: '',
            iconPath: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
        },
        {
            label: 'My Cart',
            href: '',
            iconPath:
                'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
        },
    ];

    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="grid grid-cols-1 justify-center gap-6 bg-slate-100 px-3 py-20 *:max-w-2xl sm:px-8 md:px-12 lg:grid-cols-2 lg:px-24 lg:py-36 xl:px-32 2xl:gap-12 2xl:px-56">
                <section className="flex h-fit flex-col items-center space-y-6 rounded-xl bg-white p-4 shadow sm:rounded-lg sm:p-8 lg:sticky lg:top-32">
                    <div className="relative">
                        {user?.profile_picture ? (
                            <img
                                src={user.profile_picture}
                                alt={user.name}
                                className="h-32 w-32 rounded-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : (
                            <div
                                className={`flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white`}
                            >
                                {getInitials(user?.name)}
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {user?.name || 'User'}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {user?.email || 'email@example.com'}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full space-y-2 pt-4">
                        {quickLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="group flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50"
                            >
                                <span className="flex items-center gap-3">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={link.iconPath}
                                        />
                                    </svg>
                                    <span className="font-medium text-gray-700">
                                        {link.label}
                                    </span>
                                </span>
                                <svg
                                    className="h-5 w-5 text-gray-400 transition-transform duration-200 ease-bouncy group-hover:translate-x-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </a>
                        ))}
                    </div>
                </section>
                <section className="grid gap-6 2xl:gap-12">
                    <div className="rounded-xl bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
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
