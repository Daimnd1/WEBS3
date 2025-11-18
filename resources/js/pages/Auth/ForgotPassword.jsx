import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-300 backdrop-blur-sm p-4">
            <div className="flex flex-col w-full max-w-md rounded-2xl bg-slate-200 p-8 drop-shadow-black-glow-x3">
                <h1 className="mb-6 text-center text-2xl  font-bold text-black-800">Gimme</h1>
                <h2 className="mb-6 text-center text-lg font-bold text-black-800">
                    Forgot your password?
                </h2>

            <div className="justify-center items-center mb-1 block text-sm font-medium text-black-400">
                Forgot your password? Enter your email and follow the insturactions to reset your password.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="p-1 w-full rounded-xl border-slate-800 border px-4 py-2 focus:ring-2 focus:ring-black-400 focus:outline-none"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-center">
                    <PrimaryButton className="w-3xs justify-center rounded-xl items-center bg-slate-800 py-2 text-white shadow-md transition hover:bg-slate-600 shadow-black-glow shadow-lg" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </div>
    );
}

