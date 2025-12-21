import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Lenis from 'lenis';
import { ReactNode, useEffect } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main className="min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}
