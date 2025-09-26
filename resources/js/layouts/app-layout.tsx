import { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
}
