<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(?string $category = null): Response
    {
        // Fetch all categories with product counts
        $categories = Category::withCount('products')
            ->orderBy('name')
            ->get()
            ->map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'slug' => strtolower($cat->name),
                    'productCount' => $cat->products_count,
                ];
            });

        // Build product query
        $query = Product::with('category');

        if ($category && $category !== 'all') {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', 'ilike', $category);
            });
        }

        $products = $query->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'originalPrice' => $product->original_price,
                'image' => $product->image_url,
                'rating' => $product->rating ?? 4.5,
                'reviews' => $product->reviews ?? rand(50, 200),
                'category' => strtolower($product->category->name),
            ];
        });

        return Inertia::render('Products', [
            'category' => $category,
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function show(string $id): Response
    {
        $product = Product::with(['category', 'specs.attribute'])->findOrFail($id);

        $specs = $product->specs->map(function ($spec) {
            return [
                'name' => $spec->attribute->name,
                'value' => $spec->value,
            ];
        });

        return Inertia::render('IndividualProductsPage', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'originalPrice' => $product->original_price,
                'image' => $product->image_url,
                'rating' => $product->rating ?? 4.5,
                'reviews' => $product->reviews ?? rand(50, 200),
                'description' => $product->description ?? '',
                'specs' => $specs,
                'category' => strtolower($product->category->name),
            ],
        ]);
    }

    public function home(): Response
    {
        $categories = Category::with(['products' => function ($query) {
            $query->limit(8);
        }])->get();

        $formattedCategories = $categories->map(function ($category) {
            return [
                'name' => $category->name,
                'products' => $category->products->map(function ($product) use ($category) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'originalPrice' => $product->original_price,
                        'image' => $product->image_url,
                        'rating' => 4.5,
                        'reviews' => rand(50, 200),
                        'category' => strtolower($category->name),
                    ];
                }),
            ];
        });

        $featuredProducts = Product::with('category')
            ->limit(3)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'originalPrice' => $product->original_price,
                    'image' => $product->image_url,
                    'rating' => 4.5,
                    'badge' => 'Featured',
                    'description' => $product->description ?? '',
                ];
            });

        return Inertia::render('Home', [
            'categories' => $formattedCategories,
            'featuredProducts' => $featuredProducts,
        ]);
    }

    public function favorites(): Response
    {
        $products = Product::with('category')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'originalPrice' => $product->original_price,
                    'image' => $product->image_url,
                    'rating' => $product->rating ?? 4.5,
                    'reviews' => $product->reviews ?? rand(50, 200),
                    'category' => strtolower($product->category->name),
                ];
            });

        return Inertia::render('favorites', [
            'products' => $products,
        ]);
    }
}