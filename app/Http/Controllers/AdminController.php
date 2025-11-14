<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard with all products.
     */
    public function index()
    {
        $products = Product::with('category')->latest()->get();
        $categories = Category::all();

        return Inertia::render('Admin/Dashboard', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'original_price' => 'nullable|integer|min:0',
            'image_url' => 'nullable|url|max:1000',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::create($validated);

        return redirect()->back()->with('success', 'Product created successfully!');
    }

    /**
     * Update the specified product.
     */
    public function updateProduct(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'original_price' => 'nullable|integer|min:0',
            'image_url' => 'nullable|url|max:1000',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified product.
     */
    public function destroyProduct(Product $product)
    {
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully!');
    }
}
