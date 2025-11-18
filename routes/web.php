<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [ProductController::class, 'home'])->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products');

Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');

Route::get('/cart', function () {
    return Inertia::render('CartVisualizationDemo');
})->name('cart');

Route::get('/favorites', [ProductController::class, 'favorites'])->name('favorites');

// Cart API routes
Route::middleware('auth')->group(function () {
    Route::get('/api/cart', [CartController::class, 'index'])->name('api.cart.index');
    Route::post('/api/cart', [CartController::class, 'store'])->name('api.cart.store');
    Route::patch('/api/cart/{cartItemId}', [CartController::class, 'update'])->name('api.cart.update');
    Route::delete('/api/cart/{cartItemId}', [CartController::class, 'destroy'])->name('api.cart.destroy');
    Route::delete('/api/cart', [CartController::class, 'clear'])->name('api.cart.clear');
});

// Checkout route
Route::post('/checkout', [CheckoutController::class, 'store'])->middleware('auth')->name('checkout');

// Profile routes - protected
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authentication routes
require __DIR__.'/auth.php';
