<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Cart extends Model
{
    use HasUuids;

    protected $fillable = ['user_id'];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany{
        return $this->hasMany(CartItem::class);
    }
}
