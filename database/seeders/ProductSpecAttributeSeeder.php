<?php

namespace Database\Seeders;

use App\Models\ProductSpecAttribute;
use Illuminate\Database\Seeder;

class ProductSpecAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributes = [
            // Laptops
            ['name' => 'RAM', 'unit' => 'GB'],
            ['name' => 'Storage', 'unit' => 'GB'],
            ['name' => 'Screen Size', 'unit' => 'inches'],
            ['name' => 'Processor', 'unit' => null],
            ['name' => 'Graphics', 'unit' => null],
            ['name' => 'Battery Life', 'unit' => 'hours'],
            ['name' => 'Weight', 'unit' => 'kg'],
            ['name' => 'Display Resolution', 'unit' => null],
            
            // Smartphones
            ['name' => 'RAM', 'unit' => 'GB'],
            ['name' => 'Storage', 'unit' => 'GB'],
            ['name' => 'Screen Size', 'unit' => 'inches'],
            ['name' => 'Battery Capacity', 'unit' => 'mAh'],
            ['name' => 'Camera', 'unit' => 'MP'],
            ['name' => 'Processor', 'unit' => null],
            ['name' => 'Operating System', 'unit' => null],
            ['name' => 'Display Resolution', 'unit' => null],
            
            // Headphones
            ['name' => 'Driver Size', 'unit' => 'mm'],
            ['name' => 'Frequency Response', 'unit' => 'Hz'],
            ['name' => 'Impedance', 'unit' => 'Ohms'],
            ['name' => 'Battery Life', 'unit' => 'hours'],
            ['name' => 'Weight', 'unit' => 'g'],
            ['name' => 'Connectivity', 'unit' => null],
            ['name' => 'Noise Cancellation', 'unit' => null],
            
            // Gaming
            ['name' => 'RAM', 'unit' => 'GB'],
            ['name' => 'Storage', 'unit' => 'GB'],
            ['name' => 'Processor', 'unit' => null],
            ['name' => 'Graphics', 'unit' => null],
            ['name' => 'Display Size', 'unit' => 'inches'],
            ['name' => 'Refresh Rate', 'unit' => 'Hz'],
            ['name' => 'Resolution', 'unit' => null],
            
            // Tablets
            ['name' => 'RAM', 'unit' => 'GB'],
            ['name' => 'Storage', 'unit' => 'GB'],
            ['name' => 'Screen Size', 'unit' => 'inches'],
            ['name' => 'Battery Life', 'unit' => 'hours'],
            ['name' => 'Processor', 'unit' => null],
            ['name' => 'Operating System', 'unit' => null],
            ['name' => 'Display Resolution', 'unit' => null],
            
            // TVs
            ['name' => 'Screen Size', 'unit' => 'inches'],
            ['name' => 'Resolution', 'unit' => null],
            ['name' => 'Refresh Rate', 'unit' => 'Hz'],
            ['name' => 'Smart TV', 'unit' => null],
            ['name' => 'HDMI Ports', 'unit' => null],
            ['name' => 'HDR Support', 'unit' => null],
            
            // Cameras
            ['name' => 'Sensor Size', 'unit' => null],
            ['name' => 'Megapixels', 'unit' => 'MP'],
            ['name' => 'ISO Range', 'unit' => null],
            ['name' => 'Video Resolution', 'unit' => null],
            ['name' => 'Weight', 'unit' => 'g'],
            ['name' => 'Lens Mount', 'unit' => null],
            
            // Smartwatches
            ['name' => 'Display Size', 'unit' => 'inches'],
            ['name' => 'Battery Life', 'unit' => 'days'],
            ['name' => 'Water Resistance', 'unit' => 'meters'],
            ['name' => 'Connectivity', 'unit' => null],
            ['name' => 'Sensors', 'unit' => null],
            ['name' => 'Operating System', 'unit' => null],
            
            // Audio
            ['name' => 'Power Output', 'unit' => 'W'],
            ['name' => 'Frequency Response', 'unit' => 'Hz'],
            ['name' => 'Connectivity', 'unit' => null],
            ['name' => 'Weight', 'unit' => 'kg'],
            ['name' => 'Type', 'unit' => null],
        ];

        foreach ($attributes as $attribute) {
            ProductSpecAttribute::firstOrCreate(
                ['name' => $attribute['name']],
                ['unit' => $attribute['unit']]
            );
        }
    }
}

