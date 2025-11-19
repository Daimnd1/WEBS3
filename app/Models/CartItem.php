<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Product;
use App\Models\Cart;

class CartItem extends Model
{
    use HasUuids;

    protected $table = 'cart_items';

    public $timestamps = false;

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function shoppingCart(): BelongsTo
    {
        return $this->belongsTo(Cart::class, 'cart_id');
    }

    // Backwards/semantic alias - use $cartItem->cart()
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class, 'cart_id');
    }

    // Product relation so controller can access $item->product
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
