<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CategoryAttribute;
use App\Models\ProductSpecAttribute;
use Illuminate\Database\Seeder;

class CategoryAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryAttributes = [
            'Laptops' => [
                'RAM',
                'Storage',
                'Screen Size',
                'Processor',
                'Graphics',
                'Battery Life',
                'Weight',
                'Display Resolution',
            ],
            'Smartphones' => [
                'RAM',
                'Storage',
                'Screen Size',
                'Battery Capacity',
                'Camera',
                'Processor',
                'Operating System',
                'Display Resolution',
            ],
            'Headphones' => [
                'Driver Size',
                'Frequency Response',
                'Impedance',
                'Battery Life',
                'Weight',
                'Connectivity',
                'Noise Cancellation',
            ],
            'Gaming' => [
                'RAM',
                'Storage',
                'Processor',
                'Graphics',
                'Display Size',
                'Refresh Rate',
                'Resolution',
            ],
            'Tablets' => [
                'RAM',
                'Storage',
                'Screen Size',
                'Battery Life',
                'Processor',
                'Operating System',
                'Display Resolution',
            ],
            'TVs' => [
                'Screen Size',
                'Resolution',
                'Refresh Rate',
                'Smart TV',
                'HDMI Ports',
                'HDR Support',
            ],
            'Cameras' => [
                'Sensor Size',
                'Megapixels',
                'ISO Range',
                'Video Resolution',
                'Weight',
                'Lens Mount',
            ],
            'Smartwatches' => [
                'Display Size',
                'Battery Life',
                'Water Resistance',
                'Connectivity',
                'Sensors',
                'Operating System',
            ],
            'Audio' => [
                'Power Output',
                'Frequency Response',
                'Connectivity',
                'Weight',
                'Type',
            ],
        ];

        foreach ($categoryAttributes as $categoryName => $attributeNames) {
            $category = Category::where('name', $categoryName)->first();
            
            if (!$category) {
                continue;
            }

            foreach ($attributeNames as $attributeName) {
                $attribute = ProductSpecAttribute::where('name', $attributeName)->first();
                
                if (!$attribute) {
                    continue;
                }

                CategoryAttribute::firstOrCreate([
                    'category_id' => $category->id,
                    'spec_attribute_id' => $attribute->id,
                ]);
            }
        }
    }
}

