import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

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

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mb-1 block text-sm font-medium text-gray-600 w-full rounded-xl border-slate-800 border px-4 py-2 focus:ring-2 focus:ring-black-400 focus:outline-none"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="justify-center items-center mt-4 flex">
                 

                    <PrimaryButton className="w-xs rounded-xl justify-center items-center bg-slate-800 py-2 text-white text-center shadow-md transition hover:bg-slate-600 shadow-black-glow shadow-lg" disabled={processing}>
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
