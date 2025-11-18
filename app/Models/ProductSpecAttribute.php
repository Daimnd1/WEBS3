<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ProductSpecAttribute extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $table = 'product_spec_attributes';

    protected $fillable = [
        'name',
        'unit',
    ];

    public function categoryAttributes()
    {
        return $this->hasMany(CategoryAttribute::class, 'spec_attribute_id');
    }

    public function productSpecs()
    {
        return $this->hasMany(ProductSpec::class, 'spec_attribute_id');
    }
}
