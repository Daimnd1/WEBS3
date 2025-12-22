<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [ProductController::class, 'home'])->middleware('ddos')->name('home');

Route::get('/products', [ProductController::class, 'index'])->middleware('ddos')->name('products');

Route::get('/product/{id}', [ProductController::class, 'show'])->middleware('ddos')->name('product.show');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->middleware('ddos')->name('cart');

Route::get('/favorites', [ProductController::class, 'favorites'])->middleware('ddos')->name('favorites');



// Checkout route
Route::post('/checkout', [CheckoutController::class, 'store'])->middleware(['auth', 'ddos', 'checkout.integrity'])->name('checkout');

// Review routes - protected
Route::post('/reviews', [ReviewController::class, 'store'])->middleware(['auth', 'ddos'])->name('reviews.store');

// Profile routes - protected
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes - protected by admin middleware
Route::middleware(['auth', 'admin', 'ddos'])->prefix('admin')->group(function () {
    Route::get('/', [App\Http\Controllers\AdminController::class, 'index'])->name('admin.dashboard');
    Route::post('/products', [App\Http\Controllers\AdminController::class, 'storeProduct'])->name('admin.products.store');
    Route::patch('/products/{product}', [App\Http\Controllers\AdminController::class, 'updateProduct'])->name('admin.products.update');
    Route::delete('/products/{product}', [App\Http\Controllers\AdminController::class, 'destroyProduct'])->name('admin.products.destroy');
    
    // Security Dashboard
    Route::get('/security', [App\Http\Controllers\SecurityDashboardController::class, 'index'])->name('admin.security');
    Route::post('/security/unblock', [App\Http\Controllers\SecurityDashboardController::class, 'unblock'])->name('admin.security.unblock');
    Route::post('/security/clear', [App\Http\Controllers\SecurityDashboardController::class, 'clearIncidents'])->name('admin.security.clear');
});

// Authentication routes
require __DIR__.'/auth.php';
