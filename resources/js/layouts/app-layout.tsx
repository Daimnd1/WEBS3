import Navbar from '@/components/navbar';
import { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <main className="min-h-screen">
            <Navbar />
            {children}
        </main>
    );
}
