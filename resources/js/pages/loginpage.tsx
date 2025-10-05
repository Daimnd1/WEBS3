import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-col w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Login to Your Account
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 py-2 text-white shadow-md transition hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Don’t have an account?{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>

                <Button className="mt-6 self-center rounded-xl bg-green-600 py-2 text-white shadow-md transition hover:bg-green-700">
                    <Link href="Home.tsx">Go to Home</Link>
                </Button>
            </div>
        </div>
    );
}
