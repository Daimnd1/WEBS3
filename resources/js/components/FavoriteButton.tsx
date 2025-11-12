import { useFavorites } from '@/lib/FavoritesProvider';
import { Heart } from 'lucide-react';
import { useState } from 'react';

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
    const [isAnimating, setIsAnimating] = useState(false);

    const favorite = isFavorite(productId);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAnimating(true);
        toggleFavorite(productId);

        setTimeout(() => setIsAnimating(false), 300);
    };

    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };

    return (
        <button
            onClick={handleClick}
            className={`rounded-full bg-white p-2 shadow-md transition-all hover:scale-110 hover:shadow-lg ${
                isAnimating ? 'scale-125' : ''
            } ${className}`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart
                className={`${sizeClasses[size]} transition-colors ${
                    favorite
                        ? 'fill-red-500 text-red-500'
                        : 'text-slate-400 hover:text-red-400'
                }`}
            />
        </button>
    );
}