<?php

namespace Database\Factories;

use App\Models\OrderStatuses;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderStatusesFactory extends Factory
{
    protected $model = OrderStatuses::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
            'description' => $this->faker->sentence(),
        ];
    }
}

