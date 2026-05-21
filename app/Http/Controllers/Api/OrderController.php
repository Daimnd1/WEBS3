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
    /**
     * @OA\Get(
     *     path="/api/orders",
     *     summary="Get current user's orders",
     *     tags={"Orders"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="User's orders"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/orders",
     *     summary="Place a new order",
     *     tags={"Orders"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="shipping_address", type="string", example="123 Main St"),
     *             @OA\Property(property="items", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="string"),
     *                     @OA\Property(property="quantity", type="integer", example=1)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response=201, description="Order placed"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'shipping_address' => 'nullable|string|max:500',
            'items'            => 'required|array|min:1',
            'items.*.id'       => 'required|string|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
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
            return response()->json(['message' => 'Order placed.', 'order_id' => $order->id], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to place order.'], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/admin/orders",
     *     summary="Get all orders (admin only)",
     *     tags={"Admin"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="All orders"),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=403, description="Not an admin")
     * )
     */
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

    /**
     * @OA\Patch(
     *     path="/api/admin/orders/{order}",
     *     summary="Update order status (admin only)",
     *     tags={"Admin"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="order", in="path", required=true, @OA\Schema(type="string")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="SHIPPED",
     *                 enum={"PENDING","PROCESSING","SHIPPED","DELIVERED","CANCELLED"})
     *         )
     *     ),
     *     @OA\Response(response=200, description="Status updated"),
     *     @OA\Response(response=403, description="Not an admin")
     * )
     */
    public function updateStatus(Request $request, Orders $order): JsonResponse
    {
        $request->validate(['status' => 'required|string|exists:order_statuses,name']);
        $status = OrderStatuses::where('name', $request->status)->firstOrFail();
        $order->update(['order_status_id' => $status->id]);

        return response()->json(['message' => 'Order status updated.', 'status' => $status->name]);
    }
}
