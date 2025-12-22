<?php

namespace Database\Seeders;

use App\Models\OrderStatuses;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'PENDING',
                'description' => 'Order has been placed and is awaiting processing',
            ],
            [
                'name' => 'PROCESSING',
                'description' => 'Order is being prepared for shipment',
            ],
            [
                'name' => 'SHIPPED',
                'description' => 'Order has been shipped and is in transit',
            ],
            [
                'name' => 'DELIVERED',
                'description' => 'Order has been successfully delivered',
            ],
            [
                'name' => 'CANCELLED',
                'description' => 'Order has been cancelled',
            ],
        ];

        foreach ($statuses as $status) {
            OrderStatuses::firstOrCreate(
                ['name' => $status['name']],
                ['description' => $status['description']]
            );
        }
    }
}

