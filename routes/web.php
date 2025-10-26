<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/products', function () {
    $category = request('category');
    return Inertia::render('Products', [
        'category' => $category
    ]);
})->name('products');

Route::get('/product/{id}', function ($id) {
    return Inertia::render('IndividualProductsPage', [
        'productId' => $id
    ]);
})->name('product.show');

Route::get('/cart', function () {
    return Inertia::render('CartVisualizationDemo');
})->name('cart');

Route::get('/favorites', function () {
    return Inertia::render('favorites');
})->name('favorites');



// Profile routes - protected
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authentication routes
require __DIR__.'/auth.php';
