<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Orders extends Model
{
    use HasUuids;
    
    protected $table = 'orders';
    
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'shipping_address',
        'order_status_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderStatus(): BelongsTo
    {
        return $this->belongsTo(OrderStatuses::class, 'order_status_id');
    }

    public function orderDetails(): HasMany
    {
        return $this->hasMany(OrderDetails::class, 'order_id');
    }
}
