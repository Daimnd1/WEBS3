<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProductSpecAttribute extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'unit'];
    protected $table = 'product_spec_attributes';
  
    const UPDATED_AT = null;
    
    protected $keyType = 'string';
    public $incrementing = false;

    public function specs(): HasMany
    {
        return $this->hasMany(ProductSpec::class, 'spec_attribute_id');
    }
  
    public function categoryAttributes()
    {
        return $this->hasMany(CategoryAttribute::class, 'spec_attribute_id');
    }
}
