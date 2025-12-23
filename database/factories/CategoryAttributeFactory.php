<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\CategoryAttribute;
use App\Models\ProductSpecAttribute;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryAttributeFactory extends Factory
{
    protected $model = CategoryAttribute::class;

    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'spec_attribute_id' => ProductSpecAttribute::factory(),
        ];
    }
}

