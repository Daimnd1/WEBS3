<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate(
            ['name' => 'admin'],
            ['description' => 'Administrator with full access to the system']
        );

        $customerRole = Role::firstOrCreate(
            ['name' => 'customer'],
            ['description' => 'Regular customer with standard access']
        );

        $moderatorRole = Role::firstOrCreate(
            ['name' => 'moderator'],
            ['description' => 'Moderator with content management permissions']
        );

        // Seed categories
        $this->call(CategorySeeder::class);

        // Seed product spec attributes
        $this->call(ProductSpecAttributeSeeder::class);

        // Seed category attributes (link categories to spec attributes)
        $this->call(CategoryAttributeSeeder::class);

        // Seed order statuses
        $this->call(OrderStatusSeeder::class);

        // Seed products (10 per category)
        $this->call(ProductSeeder::class);

        // Seed product specs (specifications for each product)
        $this->call(ProductSpecSeeder::class);

        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
    }
}
