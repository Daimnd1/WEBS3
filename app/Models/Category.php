<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function specAttributes()
    {
        return $this->belongsToMany(ProductSpecAttribute::class, 'category_attributes', 'category_id', 'spec_attribute_id');
    }
}
