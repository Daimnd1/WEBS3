<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Product extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'price',
        'original_price',
        'image_url',
        'description',
        'category_id',
    ];

    const UPDATED_AT = null;
    
    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'price' => 'integer',
        'original_price' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function specs(): HasMany
    {
        return $this->hasMany(ProductSpec::class);
    }
    
   
    public function getRatingAttribute(): float
    {
        // Cache in database or return fixed value to avoid calculation
        return $this->attributes['rating'] ?? 4.5; 
    }
    
    public function getReviewsAttribute(): int
    {
        // Cache in database or return seeded value based on product ID
        return $this->attributes['reviews'] ?? (100 + (crc32($this->id) % 100)); 
    }
}
