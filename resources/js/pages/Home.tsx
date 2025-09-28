import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <AppLayout>
                <section className="min-h-screen bg-slate-100 px-4 pt-20 md:pt-32"></section>
            </AppLayout>
        </>
    );
}
