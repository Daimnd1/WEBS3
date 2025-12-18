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
        $categories = Category::select('id', 'name')
            ->withCount('products')
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
        $query = Product::select('id', 'name', 'price', 'original_price', 'image_url', 'category_id')
            ->with('category:id,name');

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
                'rating' => $product->rating,
                'reviews' => $product->reviews,
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
        $product = Product::select('id', 'name', 'price', 'original_price', 'image_url', 'description', 'category_id')
            ->with([
                'category:id,name',
                'specs' => function ($query) {
                    $query->select('id', 'product_id', 'spec_attribute_id', 'value');
                },
                'specs.specAttribute:id,name,unit'
            ])
            ->findOrFail($id);

        $specs = $product->specs->map(function ($spec) {
            return [
                'name' => $spec->specAttribute->name,
                'value' => $spec->value . ($spec->specAttribute->unit ? ' ' . $spec->specAttribute->unit : ''),
            ];
        });

        return Inertia::render('IndividualProductsPage', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'originalPrice' => $product->original_price,
                'image' => $product->image_url,
                'rating' => $product->rating,
                'reviews' => $product->reviews,
                'description' => $product->description ?? '',
                'specs' => $specs,
                'category' => strtolower($product->category->name),
            ],
        ]);
    }

    public function home(): Response
    {
        $categories = Category::select('id', 'name')
            ->with(['products' => function ($query) {
                $query->select('id', 'name', 'price', 'original_price', 'image_url', 'category_id')
                    ->limit(8);
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
                        'rating' => $product->rating,
                        'reviews' => $product->reviews,
                        'category' => strtolower($category->name),
                    ];
                }),
            ];
        });

        $featuredProducts = Product::select('id', 'name', 'price', 'original_price', 'image_url', 'description')
            ->limit(3)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'originalPrice' => $product->original_price,
                    'image' => $product->image_url,
                    'rating' => $product->rating,
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
        // Only load first 100 products for performance
        // Frontend can filter based on client-side favorites
        $products = Product::select('id', 'name', 'price', 'original_price', 'image_url', 'category_id')
            ->with('category:id,name')
            ->limit(100)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'originalPrice' => $product->original_price,
                    'image' => $product->image_url,
                    'rating' => $product->rating,
                    'reviews' => $product->reviews,
                    'category' => strtolower($product->category->name),
                ];
            });

        return Inertia::render('favorites', [
            'products' => $products,
        ]);
    }
}