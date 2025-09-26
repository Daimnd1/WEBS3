import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome
                    </h1>
                    <p className="text-lg text-gray-600">
                        Your Laravel + React application is ready to build.
                    </p>
                </div>
            </div>
        </>
    );
}
