<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        // Just render the cart page
        // All cart data comes from localStorage in the frontend
        return Inertia::render('CartVisualizationDemo', [
            'initialItems' => []
        ]);
    }
}