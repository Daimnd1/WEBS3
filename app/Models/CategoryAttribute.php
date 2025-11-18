<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class CategoryAttribute extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $table = 'category_attributes';

    protected $fillable = [
        'category_id',
        'spec_attribute_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function specAttribute()
    {
        return $this->belongsTo(ProductSpecAttribute::class, 'spec_attribute_id');
    }
}
