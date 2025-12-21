import { Badge } from '@/components/ui/badge';
import { useGSAP } from '@gsap/react';
import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top bottom',
                    end: 'top 20%',
                    scrub: 1,
                },
            });

            tl.to(
                footerRef.current,
                {
                    paddingTop: '6rem',
                    paddingBottom: '6rem',
                    borderRadius: '140px 140px 0 0',
                    ease: 'power1.inOut',
                },
                0,
            );

            tl.to(
                headerRef.current,
                {
                    fontSize: '60px',
                    ease: 'power1.inOut',
                },
                0,
            );

            tl.fromTo(
                imageRef.current,
                {
                    opacity: 0,
                    scale: 0.6,
                    x: 50,
                },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    ease: 'power1.inOut',
                },
                0,
            );
        },
        { scope: footerRef },
    );

    return (
        <footer ref={footerRef} className="bg-gray-900 px-4 py-12 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <h3
                        ref={headerRef}
                        className="text-2xl font-bold text-indigo-400"
                    >
                        Gimme Electronics
                    </h3>
                    <img
                        ref={imageRef}
                        src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=300&fit=crop"
                        alt="Tech shop interior"
                        className="h-40 w-72 rounded-lg object-cover shadow-lg md:h-48 md:w-96"
                    />
                </div>
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="md:col-span-2">
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
