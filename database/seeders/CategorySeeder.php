<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Laptops',
            'Smartphones',
            'Headphones',
            'Gaming',
            'Tablets',
            'TVs',
            'Cameras',
            'Smartwatches',
            'Audio',
        ];

        foreach ($categories as $categoryName) {
            Category::firstOrCreate(
                ['name' => $categoryName]
            );
        }
    }
}

