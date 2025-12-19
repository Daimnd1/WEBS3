<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductSpec;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard with all products.
     */
    public function index(Request $request)
    {
        $categories = Category::select('id', 'name')->get();
        $selectedCategoryId = $request->query('category');
        $products = null;
        $specAttributes = [];

        if ($selectedCategoryId) {
            // Don't load specs upfront for performance - load them when editing
            $products = Product::select('id', 'name', 'price', 'original_price', 'image_url', 'category_id')
                ->with('category:id,name')
                ->where('category_id', $selectedCategoryId)
                ->latest()
                ->paginate(20)
                ->appends(['category' => $selectedCategoryId]); // Preserve category in pagination links
            
            $category = Category::select('id')
                ->with('specAttributes:id,name,unit')
                ->find($selectedCategoryId);
            $specAttributes = $category ? $category->specAttributes : [];
        }

        return Inertia::render('Admin/Dashboard', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategoryId' => $selectedCategoryId,
            'specAttributes' => $specAttributes,
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
            'specs' => 'nullable|array',
            'specs.*.spec_attribute_id' => 'required|exists:product_spec_attributes,id',
            'specs.*.value' => 'required|string',
        ]);

        $specs = $validated['specs'] ?? [];
        unset($validated['specs']);

        $product = Product::create($validated);

        foreach ($specs as $spec) {
            ProductSpec::create([
                'product_id' => $product->id,
                'spec_attribute_id' => $spec['spec_attribute_id'],
                'value' => $spec['value'],
            ]);
        }

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
            'specs' => 'nullable|array',
            'specs.*.spec_attribute_id' => 'required|exists:product_spec_attributes,id',
            'specs.*.value' => 'required|string',
        ]);

        $specs = $validated['specs'] ?? [];
        unset($validated['specs']);

        $product->update($validated);

        // Delete existing specs and recreate
        ProductSpec::where('product_id', $product->id)->delete();

        foreach ($specs as $spec) {
            ProductSpec::create([
                'product_id' => $product->id,
                'spec_attribute_id' => $spec['spec_attribute_id'],
                'value' => $spec['value'],
            ]);
        }

        return redirect()->back()->with('success', 'Product updated successfully!');
    }

    /**
     * Get a single product with specs for editing.
     */
    public function getProduct(Product $product)
    {
        $product->load([
            'specs:id,product_id,spec_attribute_id,value',
            'specs.specAttribute:id,name,unit'
        ]);

        return response()->json($product);
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
