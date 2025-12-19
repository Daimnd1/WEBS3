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
        // Build product query with optimized filtering
        $query = Product::select('id', 'name', 'price', 'original_price', 'image_url', 'category_id')
            ->with('category:id,name');

        // Optimize category filtering: direct WHERE instead of slow whereHas subquery
        if ($category && $category !== 'all') {
            // Get category ID from cache (shared categories)
            $categories = cache()->get('categories_with_counts');
            $categoryData = collect($categories)->firstWhere('slug', $category);
            
            if ($categoryData) {
                $query->where('category_id', $categoryData['id']);
            }
        }

        $products = $query->paginate(12)->through(function ($product) {
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
            // Categories now shared globally via HandleInertiaRequests
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
        // Get favorite IDs from request
        $favoriteIds = request()->input('favorites', []);

        // If no favorites, return empty result
        if (empty($favoriteIds)) {
            return Inertia::render('favorites', [
                'products' => [],
            ]);
        }

        // Filter out invalid UUIDs (handle mixed integer/UUID data from old localStorage)
        $validFavoriteIds = array_filter($favoriteIds, function ($id) {
            // UUID v4 format: 8-4-4-4-12 hex characters
            return is_string($id) && preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $id);
        });

        // If no valid UUIDs after filtering, return empty result
        if (empty($validFavoriteIds)) {
            return Inertia::render('favorites', [
                'products' => [],
            ]);
        }

        // Only fetch products that are in the favorites list
        $products = Product::select('id', 'name', 'price', 'original_price', 'image_url', 'category_id')
            ->with('category:id,name')
            ->whereIn('id', $validFavoriteIds)
            ->paginate(12)
            ->through(function ($product) {
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