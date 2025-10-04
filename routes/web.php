<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/cart', function () {
    return Inertia::render('CartVisualizationDemo');
});

