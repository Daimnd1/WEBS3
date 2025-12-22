<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductSpec;
use App\Models\ProductSpecAttribute;
use Illuminate\Database\Seeder;

class ProductSpecSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pre-load all category attributes grouped by category
        $categoryAttributesMap = [];
        $categoryAttributes = \App\Models\CategoryAttribute::with('specAttribute')->get();
        
        foreach ($categoryAttributes as $ca) {
            $categoryId = $ca->category_id;
            if (!isset($categoryAttributesMap[$categoryId])) {
                $categoryAttributesMap[$categoryId] = [];
            }
            $categoryAttributesMap[$categoryId][$ca->specAttribute->name] = $ca->specAttribute;
        }

        // Pre-load all products with categories
        $products = Product::with('category')->get();
        
        $specsToInsert = [];

        foreach ($products as $product) {
            $category = $product->category;
            $categoryName = $category->name;
            
            // Get spec attributes for this category from pre-loaded map
            $specAttributes = $categoryAttributesMap[$category->id] ?? [];

            // Generate specs based on product name and category
            $specs = $this->generateSpecsForProduct($product->name, $categoryName, $specAttributes);

            foreach ($specs as $attributeName => $value) {
                $attribute = $specAttributes[$attributeName] ?? null;
                
                if ($attribute && $value) {
                    $specsToInsert[] = [
                        'id' => \Illuminate\Support\Str::uuid()->toString(),
                        'product_id' => $product->id,
                        'spec_attribute_id' => $attribute->id,
                        'value' => $value,
                        'created_at' => now(),
                    ];
                }
            }
        }

        // Bulk insert in chunks to avoid memory issues
        foreach (array_chunk($specsToInsert, 500) as $chunk) {
            ProductSpec::insertOrIgnore($chunk);
        }
    }

    private function generateSpecsForProduct(string $productName, string $categoryName, array $specAttributes): array
    {
        $specs = [];
        $name = strtolower($productName);

        switch ($categoryName) {
            case 'Laptops':
                if (str_contains($name, 'macbook air m2')) {
                    $specs = [
                        'RAM' => '8GB',
                        'Storage' => '256GB',
                        'Screen Size' => '13.6',
                        'Processor' => 'Apple M2',
                        'Graphics' => '8-core GPU',
                        'Battery Life' => '18',
                        'Weight' => '1.24',
                        'Display Resolution' => '2560 x 1664',
                    ];
                } elseif (str_contains($name, 'macbook pro')) {
                    $specs = [
                        'RAM' => '18GB',
                        'Storage' => '512GB',
                        'Screen Size' => '14.2',
                        'Processor' => 'Apple M3',
                        'Graphics' => '18-core GPU',
                        'Battery Life' => '18',
                        'Weight' => '1.61',
                        'Display Resolution' => '3024 x 1964',
                    ];
                } elseif (str_contains($name, 'dell xps')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '512GB',
                        'Screen Size' => '13.4',
                        'Processor' => 'Intel Core i7-1355U',
                        'Graphics' => 'Intel Iris Xe',
                        'Battery Life' => '12',
                        'Weight' => '1.27',
                        'Display Resolution' => '1920 x 1200',
                    ];
                } elseif (str_contains($name, 'thinkpad')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '512GB',
                        'Screen Size' => '14',
                        'Processor' => 'Intel Core i7-1365U',
                        'Graphics' => 'Intel Iris Xe',
                        'Battery Life' => '15',
                        'Weight' => '1.12',
                        'Display Resolution' => '1920 x 1200',
                    ];
                } elseif (str_contains($name, 'hp spectre')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '512GB',
                        'Screen Size' => '13.5',
                        'Processor' => 'Intel Core i7-1355U',
                        'Graphics' => 'Intel Iris Xe',
                        'Battery Life' => '17',
                        'Weight' => '1.39',
                        'Display Resolution' => '3000 x 2000',
                    ];
                } elseif (str_contains($name, 'asus zenbook')) {
                    $specs = [
                        'RAM' => '32GB',
                        'Storage' => '1TB',
                        'Screen Size' => '16',
                        'Processor' => 'Intel Core i9-13900H',
                        'Graphics' => 'NVIDIA RTX 4070',
                        'Battery Life' => '10',
                        'Weight' => '1.95',
                        'Display Resolution' => '3840 x 2400',
                    ];
                } elseif (str_contains($name, 'surface')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '512GB',
                        'Screen Size' => '14.4',
                        'Processor' => 'Intel Core i7-11370H',
                        'Graphics' => 'NVIDIA RTX 3050 Ti',
                        'Battery Life' => '19',
                        'Weight' => '1.82',
                        'Display Resolution' => '2400 x 1600',
                    ];
                } elseif (str_contains($name, 'razer blade')) {
                    $specs = [
                        'RAM' => '32GB',
                        'Storage' => '1TB',
                        'Screen Size' => '15.6',
                        'Processor' => 'Intel Core i9-13950HX',
                        'Graphics' => 'NVIDIA RTX 4080',
                        'Battery Life' => '6',
                        'Weight' => '2.01',
                        'Display Resolution' => '2560 x 1440',
                    ];
                } elseif (str_contains($name, 'lg gram')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '512GB',
                        'Screen Size' => '17',
                        'Processor' => 'Intel Core i7-1360P',
                        'Graphics' => 'Intel Iris Xe',
                        'Battery Life' => '19',
                        'Weight' => '1.35',
                        'Display Resolution' => '2560 x 1600',
                    ];
                } else {
                    // Default laptop specs
                    $specs = [
                        'RAM' => '8GB',
                        'Storage' => '256GB',
                        'Screen Size' => '13.3',
                        'Processor' => 'Intel Core i5-1235U',
                        'Graphics' => 'Intel Iris Xe',
                        'Battery Life' => '10',
                        'Weight' => '1.4',
                        'Display Resolution' => '1920 x 1080',
                    ];
                }
                break;

            case 'Smartphones':
                if (str_contains($name, 'iphone 15 pro max')) {
                    $specs = [
                        'RAM' => '8GB',
                        'Storage' => '256GB',
                        'Screen Size' => '6.7',
                        'Battery Capacity' => '4441',
                        'Camera' => '48',
                        'Processor' => 'Apple A17 Pro',
                        'Operating System' => 'iOS 17',
                        'Display Resolution' => '2796 x 1290',
                    ];
                } elseif (str_contains($name, 'iphone 15 pro')) {
                    $specs = [
                        'RAM' => '8GB',
                        'Storage' => '128GB',
                        'Screen Size' => '6.1',
                        'Battery Capacity' => '3274',
                        'Camera' => '48',
                        'Processor' => 'Apple A17 Pro',
                        'Operating System' => 'iOS 17',
                        'Display Resolution' => '2556 x 1179',
                    ];
                } elseif (str_contains($name, 'samsung galaxy s24 ultra')) {
                    $specs = [
                        'RAM' => '12GB',
                        'Storage' => '256GB',
                        'Screen Size' => '6.8',
                        'Battery Capacity' => '5000',
                        'Camera' => '200',
                        'Processor' => 'Snapdragon 8 Gen 3',
                        'Operating System' => 'Android 14',
                        'Display Resolution' => '3120 x 1440',
                    ];
                } elseif (str_contains($name, 'samsung galaxy s24')) {
                    $specs = [
                        'RAM' => '8GB',
                        'Storage' => '128GB',
                        'Screen Size' => '6.2',
                        'Battery Capacity' => '4000',
                        'Camera' => '50',
                        'Processor' => 'Snapdragon 8 Gen 3',
                        'Operating System' => 'Android 14',
                        'Display Resolution' => '2340 x 1080',
                    ];
                } elseif (str_contains($name, 'pixel 8 pro')) {
                    $specs = [
                        'RAM' => '12GB',
                        'Storage' => '128GB',
                        'Screen Size' => '6.7',
                        'Battery Capacity' => '5050',
                        'Camera' => '50',
                        'Processor' => 'Google Tensor G3',
                        'Operating System' => 'Android 14',
                        'Display Resolution' => '2992 x 1344',
                    ];
                } elseif (str_contains($name, 'pixel 8')) {
                    $specs = [
                        'RAM' => '8GB',
                        'Storage' => '128GB',
                        'Screen Size' => '6.2',
                        'Battery Capacity' => '4575',
                        'Camera' => '50',
                        'Processor' => 'Google Tensor G3',
                        'Operating System' => 'Android 14',
                        'Display Resolution' => '2400 x 1080',
                    ];
                } elseif (str_contains($name, 'oneplus 12 pro')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '256GB',
                        'Screen Size' => '6.82',
                        'Battery Capacity' => '5400',
                        'Camera' => '50',
                        'Processor' => 'Snapdragon 8 Gen 3',
                        'Operating System' => 'OxygenOS 14',
                        'Display Resolution' => '3168 x 1440',
                    ];
                } elseif (str_contains($name, 'oneplus 12')) {
                    $specs = [
                        'RAM' => '12GB',
                        'Storage' => '256GB',
                        'Screen Size' => '6.82',
                        'Battery Capacity' => '5400',
                        'Camera' => '50',
                        'Processor' => 'Snapdragon 8 Gen 3',
                        'Operating System' => 'OxygenOS 14',
                        'Display Resolution' => '3168 x 1440',
                    ];
                } elseif (str_contains($name, 'xiaomi 14')) {
                    $specs = [
                        'RAM' => '12GB',
                        'Storage' => '256GB',
                        'Screen Size' => '6.36',
                        'Battery Capacity' => '4610',
                        'Camera' => '50',
                        'Processor' => 'Snapdragon 8 Gen 3',
                        'Operating System' => 'MIUI 15',
                        'Display Resolution' => '2670 x 1200',
                    ];
                } elseif (str_contains($name, 'nothing phone')) {
                    $specs = [
                        'RAM' => '12GB',
                        'Storage' => '256GB',
                        'Screen Size' => '6.7',
                        'Battery Capacity' => '4700',
                        'Camera' => '50',
                        'Processor' => 'Snapdragon 8+ Gen 1',
                        'Operating System' => 'Nothing OS 2.0',
                        'Display Resolution' => '2412 x 1080',
                    ];
                } else {
                    // Default smartphone specs
                    $specs = [
                        'RAM' => '8GB',
                        'Storage' => '128GB',
                        'Screen Size' => '6.1',
                        'Battery Capacity' => '4000',
                        'Camera' => '48',
                        'Processor' => 'Snapdragon 8 Gen 2',
                        'Operating System' => 'Android 13',
                        'Display Resolution' => '2400 x 1080',
                    ];
                }
                break;

            case 'Headphones':
                if (str_contains($name, 'airpods pro')) {
                    $specs = [
                        'Driver Size' => '11',
                        'Frequency Response' => '20-20000',
                        'Impedance' => 'N/A',
                        'Battery Life' => '6',
                        'Weight' => '5.4',
                        'Connectivity' => 'Bluetooth 5.3',
                        'Noise Cancellation' => 'Active',
                    ];
                } elseif (str_contains($name, 'airpods max')) {
                    $specs = [
                        'Driver Size' => '40',
                        'Frequency Response' => '20-20000',
                        'Impedance' => 'N/A',
                        'Battery Life' => '20',
                        'Weight' => '384',
                        'Connectivity' => 'Bluetooth 5.0',
                        'Noise Cancellation' => 'Active',
                    ];
                } elseif (str_contains($name, 'sony wh-1000xm5')) {
                    $specs = [
                        'Driver Size' => '30',
                        'Frequency Response' => '4-40000',
                        'Impedance' => '48',
                        'Battery Life' => '30',
                        'Weight' => '250',
                        'Connectivity' => 'Bluetooth 5.2',
                        'Noise Cancellation' => 'Active',
                    ];
                } elseif (str_contains($name, 'sony wh-1000xm4')) {
                    $specs = [
                        'Driver Size' => '40',
                        'Frequency Response' => '4-40000',
                        'Impedance' => '32',
                        'Battery Life' => '30',
                        'Weight' => '254',
                        'Connectivity' => 'Bluetooth 5.0',
                        'Noise Cancellation' => 'Active',
                    ];
                } elseif (str_contains($name, 'bose quietcomfort')) {
                    $specs = [
                        'Driver Size' => 'N/A',
                        'Frequency Response' => 'N/A',
                        'Impedance' => 'N/A',
                        'Battery Life' => '24',
                        'Weight' => '238',
                        'Connectivity' => 'Bluetooth 5.1',
                        'Noise Cancellation' => 'Active',
                    ];
                } elseif (str_contains($name, 'bose 700')) {
                    $specs = [
                        'Driver Size' => 'N/A',
                        'Frequency Response' => 'N/A',
                        'Impedance' => 'N/A',
                        'Battery Life' => '20',
                        'Weight' => '250',
                        'Connectivity' => 'Bluetooth 5.0',
                        'Noise Cancellation' => 'Active',
                    ];
                } elseif (str_contains($name, 'sennheiser hd 660s')) {
                    $specs = [
                        'Driver Size' => '38',
                        'Frequency Response' => '10-41000',
                        'Impedance' => '150',
                        'Battery Life' => 'N/A',
                        'Weight' => '260',
                        'Connectivity' => 'Wired',
                        'Noise Cancellation' => 'No',
                    ];
                } elseif (str_contains($name, 'audio-technica')) {
                    $specs = [
                        'Driver Size' => '45',
                        'Frequency Response' => '15-28000',
                        'Impedance' => '38',
                        'Battery Life' => 'N/A',
                        'Weight' => '310',
                        'Connectivity' => 'Wired',
                        'Noise Cancellation' => 'No',
                    ];
                } else {
                    // Default headphone specs
                    $specs = [
                        'Driver Size' => '40',
                        'Frequency Response' => '20-20000',
                        'Impedance' => '32',
                        'Battery Life' => '20',
                        'Weight' => '250',
                        'Connectivity' => 'Bluetooth 5.0',
                        'Noise Cancellation' => 'Active',
                    ];
                }
                break;

            case 'Gaming':
                if (str_contains($name, 'playstation 5')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '825GB',
                        'Processor' => 'AMD Zen 2 (8-core)',
                        'Graphics' => 'AMD RDNA 2 (10.28 TFLOPS)',
                        'Display Size' => 'N/A',
                        'Refresh Rate' => '120',
                        'Resolution' => '4K',
                    ];
                } elseif (str_contains($name, 'xbox series x')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '1TB',
                        'Processor' => 'AMD Zen 2 (8-core)',
                        'Graphics' => 'AMD RDNA 2 (12 TFLOPS)',
                        'Display Size' => 'N/A',
                        'Refresh Rate' => '120',
                        'Resolution' => '4K',
                    ];
                } elseif (str_contains($name, 'xbox series s')) {
                    $specs = [
                        'RAM' => '10GB',
                        'Storage' => '512GB',
                        'Processor' => 'AMD Zen 2 (8-core)',
                        'Graphics' => 'AMD RDNA 2 (4 TFLOPS)',
                        'Display Size' => 'N/A',
                        'Refresh Rate' => '120',
                        'Resolution' => '1440p',
                    ];
                } elseif (str_contains($name, 'steam deck oled')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '512GB',
                        'Processor' => 'AMD Zen 2 (4-core)',
                        'Graphics' => 'AMD RDNA 2 (1.6 TFLOPS)',
                        'Display Size' => '7',
                        'Refresh Rate' => '90',
                        'Resolution' => '1280 x 800',
                    ];
                } elseif (str_contains($name, 'steam deck')) {
                    $specs = [
                        'RAM' => '16GB',
                        'Storage' => '256GB',
                        'Processor' => 'AMD Zen 2 (4-core)',
                        'Graphics' => 'AMD RDNA 2 (1.6 TFLOPS)',
                        'Display Size' => '7',
                        'Refresh Rate' => '60',
                        'Resolution' => '1280 x 800',
                    ];
                } elseif (str_contains($name, 'nintendo switch oled')) {
                    $specs = [
                        'RAM' => '4GB',
                        'Storage' => '64GB',
                        'Processor' => 'NVIDIA Tegra X1',
                        'Graphics' => 'NVIDIA Maxwell',
                        'Display Size' => '7',
                        'Refresh Rate' => '60',
                        'Resolution' => '1280 x 720',
                    ];
                } elseif (str_contains($name, 'nintendo switch lite')) {
                    $specs = [
                        'RAM' => '4GB',
                        'Storage' => '32GB',
                        'Processor' => 'NVIDIA Tegra X1',
                        'Graphics' => 'NVIDIA Maxwell',
                        'Display Size' => '5.5',
                        'Refresh Rate' => '60',
                        'Resolution' => '1280 x 720',
                    ];
                } else {
                    // Default gaming specs
                    $specs = [
                        'RAM' => '8GB',
                        'Storage' => '256GB',
                        'Processor' => 'AMD Zen 2',
                        'Graphics' => 'AMD RDNA 2',
                        'Display Size' => 'N/A',
                        'Refresh Rate' => '60',
                        'Resolution' => '1080p',
                    ];
                }
                break;

            case 'Tablets':
                $specs = [
                    'RAM' => '8GB',
                    'Storage' => '128GB',
                    'Screen Size' => '10.9',
                    'Battery Life' => '10',
                    'Processor' => 'Apple A14',
                    'Operating System' => 'iPadOS 17',
                    'Display Resolution' => '2360 x 1640',
                ];
                break;

            case 'TVs':
                $specs = [
                    'Screen Size' => '55',
                    'Resolution' => '4K UHD',
                    'Refresh Rate' => '120',
                    'Smart TV' => 'Yes',
                    'HDMI Ports' => '4',
                    'HDR Support' => 'HDR10, Dolby Vision',
                ];
                break;

            case 'Cameras':
                $specs = [
                    'Sensor Size' => 'Full Frame',
                    'Megapixels' => '24',
                    'ISO Range' => '100-51200',
                    'Video Resolution' => '4K',
                    'Weight' => '650',
                    'Lens Mount' => 'E-mount',
                ];
                break;

            case 'Smartwatches':
                $specs = [
                    'Display Size' => '1.9',
                    'Battery Life' => '2',
                    'Water Resistance' => '50',
                    'Connectivity' => 'Bluetooth, Wi-Fi, Cellular',
                    'Sensors' => 'Heart Rate, GPS, Accelerometer',
                    'Operating System' => 'watchOS 10',
                ];
                break;

            case 'Audio':
                $specs = [
                    'Power Output' => '100',
                    'Frequency Response' => '20-20000',
                    'Connectivity' => 'Bluetooth, Wi-Fi, AUX',
                    'Weight' => '3.5',
                    'Type' => 'Bookshelf Speakers',
                ];
                break;

            default:
                $specs = [];
        }

        return $specs;
    }
}

