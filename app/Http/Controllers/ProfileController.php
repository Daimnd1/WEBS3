<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Orders;
use App\Models\Product;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $orders = Orders::with(['orderStatus', 'orderDetails.product'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(fn($o) => [
                'id'         => $o->id,
                'status'     => $o->orderStatus?->name ?? 'UNKNOWN',
                'total'      => $o->orderDetails->sum(fn($d) => $d->quantity * $d->unit_price),
                'created_at' => $o->created_at?->format('M d, Y'),
                'items'      => $o->orderDetails->map(fn($d) => [
                    'name'       => $d->product?->name ?? 'Deleted product',
                    'image'      => $d->product?->image_url,
                    'quantity'   => $d->quantity,
                    'unit_price' => $d->unit_price,
                ]),
            ]);

        $products = Product::with('category')->get()->map(fn($p) => [
            'id'       => $p->id,
            'name'     => $p->name,
            'price'    => $p->price,
            'image'    => $p->image_url,
            'category' => $p->category->name,
        ]);

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status'          => session('status'),
            'orders'          => $orders,
            'products'        => $products,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
