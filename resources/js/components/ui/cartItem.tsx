import React from 'react';

import { ICartItem } from '@/types/cart';

interface IItemSafe{
    item: ICartItem;
    isLoading: boolean;
    onUpdateQuantity: (itemID: number, itemQuantity: number) => void;
    onRemoveItem: (itemID: number) => void;
}

const CartItem: React.FC<IItemSafe> = ({
    item,
    isLoading,
    onUpdateQuantity,
    onRemoveItem
}) => {
    const { cart_item_id, name, price, quantity, total_price, image_url } = item;    

    const handleRemove = () =>{
        onRemoveItem(cart_item_id);
    };

    return (
        <div className="flex border py-6 space-x-3">
            {/*For image*/}
            <div className="w-16 h-16 flex-shrink-0">
                <img
                    src={image_url}
                    alt={"Image of ${name}"}
                    className="w-full h-full object-cover" />
            </div>

            {/*For item details*/}
            <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold truncate text-red-400">{name}</h3>
                <p className="text-sm text-gray-500">€{price.toFixed(2)} per unit</p>
            </div>

            {/*For modifying quantity*/}
            <div className="w-24 flex-shrink-0">
                <button onClick={ () => onUpdateQuantity(cart_item_id, quantity - 1)}
                    disabled = {isLoading || quantity <= 1}
                    className="px-2 py-1 border rounded-l">
                    -
                </button>

                <span className="px-3">{quantity}</span>

                <button onClick={ () => onUpdateQuantity(cart_item_id, quantity + 1)}
                    disabled = {isLoading}>
                    +
                </button>
            </div>

            {/*For displaying total price*/}
            <div className="w-28 flex-shrink-0 text-right">
                <p className="text-lg font-semibold text-gray-900">
                    €{(quantity * price).toFixed(2)}
                </p>
            </div>

            {/*For removing the button*/}
            <div className="flex-shrink-0">
                <button onClick={handleRemove}
                    disabled={isLoading}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150 disabled:opacity-50">
                        X
                </button>
            </div>
        </div>
    )
}
