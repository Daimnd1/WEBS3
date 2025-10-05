import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Zap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 px-4 py-12 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <h3 className="mb-4 text-2xl font-bold text-indigo-400">
                            Gimme Electronics
                        </h3>
                        <p className="mb-4 text-gray-300">
                            Your trusted destination for the latest electronics
                            and tech gadgets. We bring you cutting-edge
                            technology at unbeatable prices.
                        </p>
                        <div className="flex gap-2">
                            <Badge
                                variant="outline"
                                className="border-indigo-400 text-indigo-400"
                            >
                                <Zap className="mr-1 h-3 w-3" />
                                Fast Shipping
                            </Badge>
                            <Badge
                                variant="outline"
                                className="border-indigo-400 text-indigo-400"
                            >
                                24/7 Support
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-indigo-400"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-indigo-400"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shipping"
                                    className="hover:text-indigo-400"
                                >
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/returns"
                                    className="hover:text-indigo-400"
                                >
                                    Returns
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 font-semibold">Categories</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link
                                    href="/laptops"
                                    className="hover:text-emerald-400"
                                >
                                    Laptops
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/smartphones"
                                    className="hover:text-emerald-400"
                                >
                                    Smartphones
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/headphones"
                                    className="hover:text-emerald-400"
                                >
                                    Headphones
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gaming"
                                    className="hover:text-emerald-400"
                                >
                                    Gaming
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 Gimme Electronics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
