<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/products",
     *     summary="List all products",
     *     tags={"Products"},
     *     @OA\Parameter(name="search", in="query", description="Search by name", @OA\Schema(type="string")),
     *     @OA\Parameter(name="category", in="query", description="Filter by category name", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="List of products")
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category');

        if ($request->filled('category')) {
            $query->whereHas('category', fn($q) =>
                $q->where('name', 'like', '%' . $request->category . '%')
            );
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->get()->map(fn($p) => [
            'id'             => $p->id,
            'name'           => $p->name,
            'price'          => $p->price,
            'original_price' => $p->original_price,
            'image_url'      => $p->image_url,
            'description'    => $p->description,
            'category'       => $p->category->name,
        ]);

        return response()->json(['data' => $products]);
    }

    /**
     * @OA\Get(
     *     path="/api/products/{id}",
     *     summary="Get a single product with specs and reviews",
     *     tags={"Products"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Product details"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function show(string $id): JsonResponse
    {
        $product = Product::with([
            'category',
            'specs.specAttribute',
            'reviews.user',
        ])->findOrFail($id);

        $specs = $product->specs->map(fn($s) => [
            'name'  => $s->specAttribute->name,
            'unit'  => $s->specAttribute->unit,
            'value' => $s->value,
        ]);

        $reviews = $product->reviews->map(fn($r) => [
            'id'         => $r->id,
            'rating'     => $r->rating,
            'comment'    => $r->comment,
            'user'       => $r->user->name ?? 'Anonymous',
            'created_at' => $r->created_at?->toDateString(),
        ]);

        return response()->json([
            'data' => [
                'id'             => $product->id,
                'name'           => $product->name,
                'price'          => $product->price,
                'original_price' => $product->original_price,
                'image_url'      => $product->image_url,
                'description'    => $product->description,
                'category'       => $product->category->name,
                'specs'          => $specs,
                'reviews'        => $reviews,
                'reviews_count'  => $reviews->count(),
                'average_rating' => $reviews->count()
                    ? round($reviews->avg('rating'), 1)
                    : null,
            ],
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/categories",
     *     summary="List all categories with product count",
     *     tags={"Products"},
     *     @OA\Response(response=200, description="List of categories")
     * )
     */
    public function categories(): JsonResponse
    {
        $categories = Category::withCount('products')->get()->map(fn($c) => [
            'id'            => $c->id,
            'name'          => $c->name,
            'product_count' => $c->products_count,
        ]);

        return response()->json(['data' => $categories]);
    }
}
