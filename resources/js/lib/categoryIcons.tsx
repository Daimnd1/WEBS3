import {
    Grid3X3,
    Monitor,
    Smartphone,
    Headphones,
    GamepadIcon,
    Laptop,
    Watch,
    Tablet,
    Camera,
    Tv,
    Speaker,
} from 'lucide-react';
import { JSX } from 'react';

export function getCategoryIcon(categoryName: string) {
    const name = categoryName.toLowerCase();

    // Map exact category names to icons
    const iconMap: Record<string, JSX.Element> = {
        smartphones: <Smartphone className="h-5 w-5" />,
        laptops: <Laptop className="h-5 w-5" />,
        tablets: <Tablet className="h-5 w-5" />,
        tvs: <Tv className="h-5 w-5" />,
        headphones: <Headphones className="h-5 w-5" />,
        cameras: <Camera className="h-5 w-5" />,
        smartwatches: <Watch className="h-5 w-5" />,
        audio: <Speaker className="h-5 w-5" />,
        gaming: <GamepadIcon className="h-5 w-5" />,
        all: <Grid3X3 className="h-5 w-5" />,
    };

    return iconMap[name] || <Monitor className="h-5 w-5" />;
}