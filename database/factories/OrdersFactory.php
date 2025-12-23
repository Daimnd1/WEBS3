<?php

namespace Database\Factories;

use App\Models\OrderStatuses;
use App\Models\Orders;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrdersFactory extends Factory
{
    protected $model = Orders::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'shipping_address' => $this->faker->address(),
            'order_status_id' => OrderStatuses::factory(),
        ];
    }
}

