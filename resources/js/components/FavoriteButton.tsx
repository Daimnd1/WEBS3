import { useFavorites } from '@/lib/FavoritesProvider';
import { Heart } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';

interface FavoriteButtonProps {
    productId: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function FavoriteButton({
    productId,
    size = 'md',
    className = '',
}: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const heartRef = useRef<SVGSVGElement>(null);

    const favorite = isFavorite(productId);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const isAdding = !favorite;
        toggleFavorite(productId);

        // GSAP heart pop animation
        if (heartRef.current) {
            gsap.timeline()
                .to(heartRef.current, {
                    scale: isAdding ? 1.4 : 0.8,
                    duration: 0.15,
                    ease: 'power2.out',
                })
                .to(heartRef.current, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'elastic.out(1, 0.3)',
                });
        }
    };

    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };

    return (
        <button
            onClick={handleClick}
            className={`rounded-full bg-white p-2 shadow-md transition-all hover:scale-110 hover:shadow-lg ${className}`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart
                ref={heartRef}
                className={`${sizeClasses[size]} transition-colors ${
                    favorite
                        ? 'fill-red-500 text-red-500'
                        : 'text-slate-400 hover:text-red-400'
                }`}
            />
        </button>
    );
}