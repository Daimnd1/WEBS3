<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    private function getOrCreateCart(): Cart
    {
        return Cart::firstOrCreate(['user_id' => Auth::id()]);
    }

    public function index(): JsonResponse
    {
        $cart = Cart::with(['items.product'])->where('user_id', Auth::id())->first();

        if (!$cart) {
            return response()->json(['items' => []]);
        }

        $items = $cart->items->map(fn($item) => [
            'id'       => $item->id,
            'product_id' => $item->product_id,
            'name'     => $item->product->name,
            'price'    => $item->product->price,
            'image'    => $item->product->image_url,
            'quantity' => $item->quantity,
        ]);

        return response()->json(['items' => $items]);
    }

    public function addItem(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|uuid|exists:products,id',
            'quantity'   => 'integer|min:1',
        ]);

        $cart     = $this->getOrCreateCart();
        $quantity = $request->quantity ?? 1;

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            $item->increment('quantity', $quantity);
        } else {
            $item = CartItem::create([
                'cart_id'    => $cart->id,
                'product_id' => $request->product_id,
                'quantity'   => $quantity,
            ]);
        }

        $item->load('product');

        return response()->json([
            'item' => [
                'id'         => $item->id,
                'product_id' => $item->product_id,
                'name'       => $item->product->name,
                'price'      => $item->product->price,
                'image'      => $item->product->image_url,
                'quantity'   => $item->quantity,
            ],
        ], 201);
    }

    public function updateItem(Request $request, CartItem $item): JsonResponse
    {
        $this->authorizeItem($item);

        $request->validate(['quantity' => 'required|integer|min:1']);

        $item->update(['quantity' => $request->quantity]);

        return response()->json(['quantity' => $item->quantity]);
    }

    public function removeItem(CartItem $item): JsonResponse
    {
        $this->authorizeItem($item);
        $item->delete();

        return response()->json(['message' => 'Item removed.']);
    }

    public function clear(): JsonResponse
    {
        $cart = Cart::where('user_id', Auth::id())->first();
        $cart?->items()->delete();

        return response()->json(['message' => 'Cart cleared.']);
    }

    private function authorizeItem(CartItem $item): void
    {
        $cart = Cart::where('user_id', Auth::id())->first();

        abort_if(!$cart || $item->cart_id !== $cart->id, 403, 'Unauthorized.');
    }
}
