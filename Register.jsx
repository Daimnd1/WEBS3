import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // --- live validators ---
    const validateEmailLive = (value) => {
        if (!value) {
            clearErrors('email');
            return;
        }
        if (emailRegex.test(value)) clearErrors('email');
        else setError({ email: 'Please enter a valid email (example: user@gmail.com).' });
    };

    const validatePasswordLive = (value) => {
        if (!value) {
            clearErrors('password');
            return;
        }
        if (passwordRegex.test(value)) clearErrors('password');
        else
            setError({
                password:
                    'Password must be at least 7 characters and include 1 uppercase, 1 lowercase, and 1 number.',
            });
    };

    const validatePasswordConfirmationLive = (value, passwordValue = data.password) => {
        if (!value) {
            clearErrors('password_confirmation');
            return;
        }
        if ((passwordValue || '') === value) clearErrors('password_confirmation');
        else setError({ password_confirmation: 'Passwords do not match.' });
    };

    // --- submit-time validation (blocks submit) ---
    const validate = () => {
        const newErrors = {};

        if (!emailRegex.test(data.email || '')) {
            newErrors.email = 'Please enter a valid email (example: user@gmail.com).';
        }

        if (!passwordRegex.test(data.password || '')) {
            newErrors.password =
                'Password must be at least 7 characters and include 1 uppercase, 1 lowercase, and 1 number.';
        }

        if ((data.password || '') !== (data.password_confirmation || '')) {
            newErrors.password_confirmation = 'Passwords do not match.';
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return false;
        }

        return true;
    };

    const submit = (e) => {
        e.preventDefault();

        clearErrors('email', 'password', 'password_confirmation');

        if (!validate()) return;

        // ✅ ROUTE STAYS EXACTLY THE SAME
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-300 backdrop-blur-sm p-4 ">
            <div className="flex flex-col w-full max-w-md rounded-2xl bg-slate-200 p-8 drop-shadow-black-glow-x3 ">
                <h1 className="mb-6 text-center text-2xl  font-bold text-black-800">Gimme</h1>
                <h2 className="mb-6 text-center text-lg font-bold text-black-800">
                    Register Your Account
                </h2>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mb-1 block text-sm font-medium text-gray-600 w-full rounded-xl border-slate-800 border px-4 py-2 focus:ring-2 focus:ring-black-400 focus:outline-none"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mb-1 block text-sm font-medium text-gray-600 w-full rounded-xl border-slate-800 border px-4 py-2 focus:ring-2 focus:ring-black-400 focus:outline-none"
                            autoComplete="username"
                            onChange={(e) => {
                                const v = e.target.value;
                                setData('email', v);
                                validateEmailLive(v);
                            }}
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
                            onChange={(e) => {
                                const v = e.target.value;
                                setData('password', v);
                                validatePasswordLive(v);

                                // re-check confirmation when password changes
                                if (data.password_confirmation) {
                                    validatePasswordConfirmationLive(data.password_confirmation, v);
                                }
                            }}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mb-1 block text-sm font-medium text-gray-600 w-full rounded-xl border-slate-800 border px-4 py-2 focus:ring-2 focus:ring-black-400 focus:outline-none"
                            autoComplete="new-password"
                            onChange={(e) => {
                                const v = e.target.value;
                                setData('password_confirmation', v);
                                validatePasswordConfirmationLive(v);
                            }}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="justify-center items-center mt-4 flex">
                        <PrimaryButton
                            className="w-xs rounded-xl justify-center items-center bg-slate-800 py-2 text-white text-center shadow-md transition hover:bg-slate-600 shadow-black-glow shadow-lg"
                            disabled={processing}
                        >
                            Register
                        </PrimaryButton>
                    </div>

                    <div className="justify-center items-center mt-4 flex">
                        <Link
                            href={route('login')}
                            className="rounded-md text-sm justify-center items-center text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Already registered?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
