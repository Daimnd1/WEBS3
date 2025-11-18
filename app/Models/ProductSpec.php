<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ProductSpec extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $table = 'product_specs';

    protected $fillable = [
        'product_id',
        'spec_attribute_id',
        'value',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function specAttribute()
    {
        return $this->belongsTo(ProductSpecAttribute::class, 'spec_attribute_id');
    }
}
