import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import SupportChat from '@/components/SupportChat';
import { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.isAdmin === true || auth?.isAdmin === true;

    return (
        <div>
            <Navbar />
            {children}
            <Footer />
            {auth?.user && !isAdmin && <SupportChat />}
        </div>
    );
}
