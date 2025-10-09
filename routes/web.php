<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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
    // $id = request('id');
    return Inertia::render('Product', [
        'productId' => $id
    ]);
})->name('product.show');

Route::get('/login', function () {
    return Inertia::render('loginpage');
})->name('loginpage');

Route::get('/cart', function () {
    return Inertia::render('CartVisualizationDemo');
})->name('cart');

Route::get('/favorites', function () {
    return Inertia::render('favorites');
})->name('favorites');



