<?php

namespace Database\Factories;

use App\Models\ProductSpecAttribute;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductSpecAttributeFactory extends Factory
{
    protected $model = ProductSpecAttribute::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['RAM', 'Storage', 'Screen Size', 'Processor', 'Battery']),
            'unit' => $this->faker->randomElement(['GB', 'TB', 'inches', 'GHz', 'mAh', null]),
        ];
    }
}

