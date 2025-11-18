import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    isAdmin?: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Global route function from Ziggy
declare global {
    function route(name: string, params?: any): string;
}
export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    reviews: number;
    category: string;
    description?: string;
    specs?: ProductSpec[];
}

export interface ProductSpec {
    name: string;
    value: string;
}

export interface Category {
    name: string;
    icon: React.ReactNode; 
    products: Product[];
}

export interface FeaturedProduct extends Product {
    badge?: string;
}

export interface FeaturedProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    image: string;
    badge: string;
    highlight: string; 
    catchyText: string; 
}
