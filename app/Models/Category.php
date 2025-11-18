<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasUuids;

    protected $fillable = ['name'];
    
  
    const UPDATED_AT = null;
    
   
    protected $keyType = 'string';
    public $incrementing = false;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
  
    public function specAttributes(): BelongsToMany
    {
        return $this->belongsToMany(ProductSpecAttribute::class, 'category_attributes', 'category_id', 'spec_attribute_id');
    }
}
