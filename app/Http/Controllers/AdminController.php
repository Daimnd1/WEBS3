<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Orders;
use App\Models\OrderStatuses;
use App\Models\Product;
use App\Models\ProductSpec;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        $selectedCategoryId = $request->query('category');
        $products = null;
        $specAttributes = [];

        if ($selectedCategoryId) {
            $products = Product::with(['category', 'specs.specAttribute'])
                ->where('category_id', $selectedCategoryId)
                ->latest()
                ->get();

            $category = Category::with('specAttributes')->find($selectedCategoryId);
            $specAttributes = $category ? $category->specAttributes : [];
        }

        $stats = [
            'products' => Product::count(),
            'orders'   => Orders::count(),
            'users'    => User::count(),
            'revenue'  => (int) DB::table('order_details')->sum(DB::raw('quantity * unit_price')),
        ];

        return Inertia::render('Admin/Dashboard', [
            'products'           => $products,
            'categories'         => $categories,
            'selectedCategoryId' => $selectedCategoryId,
            'specAttributes'     => $specAttributes,
            'stats'              => $stats,
        ]);
    }

    public function orders()
    {
        $orders = Orders::with(['user', 'orderStatus', 'orderDetails'])
            ->latest('id')
            ->get()
            ->map(function ($order) {
                return [
                    'id'               => $order->id,
                    'user'             => $order->user ? ['name' => $order->user->name, 'email' => $order->user->email] : null,
                    'status'           => $order->orderStatus?->name ?? 'UNKNOWN',
                    'shipping_address' => $order->shipping_address,
                    'total'            => $order->orderDetails->sum(fn($d) => $d->quantity * $d->unit_price),
                    'items_count'      => $order->orderDetails->sum('quantity'),
                    'created_at'       => $order->id,
                ];
            });

        $statuses = OrderStatuses::all(['id', 'name']);

        return Inertia::render('Admin/Orders', [
            'orders'   => $orders,
            'statuses' => $statuses,
        ]);
    }

    public function updateOrderStatus(Request $request, Orders $order)
    {
        $request->validate(['status_id' => 'required|exists:order_statuses,id']);
        $order->update(['order_status_id' => $request->status_id]);
        return redirect()->back()->with('success', 'Order status updated.');
    }

    public function users()
    {
        $users = User::with('role')
            ->withCount('supportMessages as message_count')
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id'            => $user->id,
                    'name'          => $user->name,
                    'email'         => $user->email,
                    'role'          => $user->role?->name ?? 'customer',
                    'message_count' => $user->message_count,
                    'created_at'    => $user->created_at,
                ];
            });

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'name'                          => 'required|string|max:255',
            'price'                         => 'required|integer|min:0',
            'original_price'                => 'nullable|integer|min:0',
            'image_url'                     => 'nullable|url|max:1000',
            'description'                   => 'nullable|string',
            'category_id'                   => 'required|exists:categories,id',
            'specs'                         => 'nullable|array',
            'specs.*.spec_attribute_id'     => 'required|exists:product_spec_attributes,id',
            'specs.*.value'                 => 'required|string',
        ]);

        $specs = $validated['specs'] ?? [];
        unset($validated['specs']);

        $product = Product::create($validated);

        foreach ($specs as $spec) {
            ProductSpec::create([
                'product_id'        => $product->id,
                'spec_attribute_id' => $spec['spec_attribute_id'],
                'value'             => $spec['value'],
            ]);
        }

        return redirect()->back()->with('success', 'Product created successfully!');
    }

    public function updateProduct(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name'                          => 'required|string|max:255',
            'price'                         => 'required|integer|min:0',
            'original_price'                => 'nullable|integer|min:0',
            'image_url'                     => 'nullable|url|max:1000',
            'description'                   => 'nullable|string',
            'category_id'                   => 'required|exists:categories,id',
            'specs'                         => 'nullable|array',
            'specs.*.spec_attribute_id'     => 'required|exists:product_spec_attributes,id',
            'specs.*.value'                 => 'required|string',
        ]);

        $specs = $validated['specs'] ?? [];
        unset($validated['specs']);

        $product->update($validated);

        ProductSpec::where('product_id', $product->id)->delete();

        foreach ($specs as $spec) {
            ProductSpec::create([
                'product_id'        => $product->id,
                'spec_attribute_id' => $spec['spec_attribute_id'],
                'value'             => $spec['value'],
            ]);
        }

        return redirect()->back()->with('success', 'Product updated successfully!');
    }

    public function destroyProduct(Product $product)
    {
        $product->delete();
        return redirect()->back()->with('success', 'Product deleted successfully!');
    }
}
