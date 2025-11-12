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
        return 4.5; 
    }
    
   
    public function getReviewsAttribute(): int
    {
        return rand(50, 200); 
    }
}