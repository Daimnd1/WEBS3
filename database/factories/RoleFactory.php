<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition(): array
    {
        static $counter = 0;
        $roles = ['admin', 'customer', 'moderator'];
        
        return [
            'name' => $roles[$counter++ % count($roles)] . '_' . uniqid(),
            'description' => $this->faker->sentence(),
        ];
    }
}

