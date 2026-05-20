<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public routes — no login required
|--------------------------------------------------------------------------
*/
Route::get('/products',            [ProductController::class, 'index']);
Route::get('/products/{id}',       [ProductController::class, 'show']);
Route::get('/categories',          [ProductController::class, 'categories']);

Route::post('/auth/login',         [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected routes — require Bearer token
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout',    [AuthController::class, 'logout']);
    Route::get('/auth/me',         [AuthController::class, 'me']);

    Route::get('/orders',          [OrderController::class, 'index']);
    Route::post('/orders',         [OrderController::class, 'store']);

    Route::post('/reviews',        [ReviewController::class, 'store']);

    /*
    |----------------------------------------------------------------------
    | Admin-only routes
    |----------------------------------------------------------------------
    */
    Route::middleware('api.admin')->group(function () {
        Route::get('/admin/orders',              [OrderController::class, 'adminIndex']);
        Route::patch('/admin/orders/{order}',    [OrderController::class, 'updateStatus']);
    });
});
