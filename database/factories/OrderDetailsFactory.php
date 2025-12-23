<?php

namespace Database\Factories;

use App\Models\OrderDetails;
use App\Models\Orders;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailsFactory extends Factory
{
    protected $model = OrderDetails::class;

    public function definition(): array
    {
        return [
            'order_id' => Orders::factory(),
            'product_id' => Product::factory(),
            'quantity' => $this->faker->numberBetween(1, 5),
            'unit_price' => $this->faker->randomFloat(2, 10, 1000),
        ];
    }
}

