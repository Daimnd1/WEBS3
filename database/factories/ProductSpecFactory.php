<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductSpec;
use App\Models\ProductSpecAttribute;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductSpecFactory extends Factory
{
    protected $model = ProductSpec::class;

    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'spec_attribute_id' => ProductSpecAttribute::factory(),
            'value' => $this->faker->word(),
        ];
    }
}

