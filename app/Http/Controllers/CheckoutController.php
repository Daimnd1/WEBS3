<?php

namespace App\Http\Controllers;

use App\Models\OrderDetails;
use App\Models\OrderStatuses;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Please login to checkout',
                'redirect_url' => route('loginpage'),
            ], 401);
        }

        $validated = $request->validate([
            'shipping_address' => 'nullable|string|max:500',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ], [
            'items.required' => 'Your cart is empty.',
        ]);

        DB::beginTransaction();

        try {
            
            $pendingStatus = OrderStatuses::where('name', 'PENDING')->first();
            
            if (!$pendingStatus) {
                throw new \Exception('Order status "PENDING" not found in database');
            }

            $order = Orders::create([
                'user_id' => Auth::id(),
                'shipping_address' => $validated['shipping_address'] ?? null,
                'order_status_id' => $pendingStatus->id,
            ]);

            foreach ($validated['items'] as $item) {
                $unitPrice = $item['price'] ?? null;

                if ($unitPrice === null) {
                    throw ValidationException::withMessages([
                        'items' => ['Each item must include a price.'],
                    ]);
                }

                OrderDetails::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'order_id' => $order->id,
            ], 201);
        } catch (ValidationException $exception) {
            DB::rollBack();
            throw $exception;
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to create order: ' . $e->getMessage(),
            ], 500);
        }
    }
}
