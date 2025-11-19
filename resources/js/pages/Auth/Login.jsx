import Checkbox from '@/components/Checkbox';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
         <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-300 backdrop-blur-sm p-4 ">

       <div className="flex flex-col w-full max-w-md rounded-2xl bg-slate-200 p-8 drop-shadow-black-glow-x3 ">            
         <h1 className="mb-6 text-center text-2xl  font-bold text-black-800">Gimme</h1>
            <h2 className="mb-6 text-center text-lg font-bold text-black-800">
                     Login to Your Account
                </h2>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                 <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                
                        <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mb-1 block text-sm font-medium text-gray-600 w-full rounded-xl border-slate-800 border px-4 py-2 focus:ring-2 focus:ring-black-400 focus:outline-none"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                
                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />
                
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mb-1 block text-sm font-medium text-gray-600 w-full rounded-xl border-slate-800 border px-4 py-2 focus:ring-2 focus:ring-black-400 focus:outline-none"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                
                      <InputError message={errors.password} className="mt-2" />
                     </div>
                
                               

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-center">
                    <PrimaryButton className="w-2xs rounded-xl justify-center items-center bg-slate-800 py-2 text-white shadow-md transition hover:bg-slate-600 shadow-black-glow shadow-lg" disabled={processing}>
                            Log in
                        </PrimaryButton>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={route('register')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Don't have an account?
                    </Link>

                    <div className="flex items-center">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm justify-center items-center text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        
                    </div>
                </div>
            </form>
        </div>
     </div>
    );
}

