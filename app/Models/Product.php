<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'price',
        'original_price',
        'image_url',
        'description',
        'category_id',
    ];

    protected $casts = [
        'price' => 'integer',
        'original_price' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
