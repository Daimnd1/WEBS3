<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProductSpec extends Model
{
    use HasUuids;

    protected $fillable = ['value', 'spec_attribute_id', 'product_id'];
    
    const UPDATED_AT = null;
    
    protected $keyType = 'string';
    public $incrementing = false;

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(ProductSpecAttribute::class, 'spec_attribute_id');
    }
}