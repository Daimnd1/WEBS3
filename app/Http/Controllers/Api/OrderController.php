<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderDetails;
use App\Models\Orders;
use App\Models\OrderStatuses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $orders = Orders::with(['orderStatus', 'orderDetails'])
            ->where('user_id', $request->user()->id)
            ->latest('id')
            ->get()
            ->map(fn($o) => [
                'id'               => $o->id,
                'status'           => $o->orderStatus?->name,
                'shipping_address' => $o->shipping_address,
                'total'            => $o->orderDetails->sum(fn($d) => $d->quantity * $d->unit_price),
                'items_count'      => $o->orderDetails->sum('quantity'),
            ]);

        return response()->json(['data' => $orders]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'shipping_address'      => 'nullable|string|max:500',
            'items'                 => 'required|array|min:1',
            'items.*.id'            => 'required|string|exists:products,id',
            'items.*.quantity'      => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            $pending = OrderStatuses::where('name', 'PENDING')->firstOrFail();

            $order = Orders::create([
                'user_id'          => $request->user()->id,
                'shipping_address' => $request->shipping_address,
                'order_status_id'  => $pending->id,
            ]);

            foreach ($request->items as $item) {
                $product = \App\Models\Product::findOrFail($item['id']);

                OrderDetails::create([
                    'order_id'   => $order->id,
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'unit_price' => $product->price,
                ]);
            }

            DB::commit();

            return response()->json([
                'message'  => 'Order placed successfully.',
                'order_id' => $order->id,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to place order.'], 500);
        }
    }

    // Admin: list all orders
    public function adminIndex(): JsonResponse
    {
        $orders = Orders::with(['user', 'orderStatus', 'orderDetails'])
            ->latest('id')
            ->get()
            ->map(fn($o) => [
                'id'               => $o->id,
                'user'             => $o->user ? ['name' => $o->user->name, 'email' => $o->user->email] : null,
                'status'           => $o->orderStatus?->name,
                'shipping_address' => $o->shipping_address,
                'total'            => $o->orderDetails->sum(fn($d) => $d->quantity * $d->unit_price),
                'items_count'      => $o->orderDetails->sum('quantity'),
            ]);

        return response()->json(['data' => $orders]);
    }

    // Admin: update order status
    public function updateStatus(Request $request, Orders $order): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|exists:order_statuses,name',
        ]);

        $status = OrderStatuses::where('name', $request->status)->firstOrFail();
        $order->update(['order_status_id' => $status->id]);

        return response()->json(['message' => 'Order status updated.', 'status' => $status->name]);
    }
}
