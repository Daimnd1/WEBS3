<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;


class CheckoutIntegrity
{
    
    public function handle(Request $request, Closure $next): Response
    {
        $items = $request->input('items', []);
        $clientTotal = (float) $request->input('total', 0);
        $serverTotal = 0.0;
        $tampered = false;
        $correctedItems = [];

        foreach ($items as $item)
        {
            // Accept either product_id or id from client
            $productId = $item['product_id'] ?? ($item['id'] ?? null);
            $quantity = (int) ($item['quantity'] ?? 1);
            $clientPrice = (float) ($item['price'] ?? 0.0);

            if (!$productId) {
                $tampered = true;
                continue;
            }

            $product = DB::table('products')->find($productId);
            if (!$product) {
                $tampered = true;
                continue;
            }

            $realPrice = (float) $product->price;
            
            // Round prices to 2 decimals before comparing to avoid floating-point precision issues
            $clientPriceRounded = round($clientPrice, 2);
            $realPriceRounded = round($realPrice, 2);
            
            if (abs($clientPriceRounded - $realPriceRounded) > 0.01) {
                $tampered = true;
            }

            $serverTotal += $realPrice * $quantity;

            $correctedItems[] = [
                'id'       => (string) $productId,
                'quantity' => $quantity,
                'price'    => $realPrice,
            ];
        }

        // Round totals to 2 decimals before comparing
        $clientTotalRounded = round($clientTotal, 2);
        $serverTotalRounded = round($serverTotal, 2);
        
        // Debug logging
        Log::info('Checkout validation', [
            'client_total' => $clientTotal,
            'server_total' => $serverTotal,
            'client_rounded' => $clientTotalRounded,
            'server_rounded' => $serverTotalRounded,
            'diff' => abs($clientTotalRounded - $serverTotalRounded),
        ]);
        
        if (abs($clientTotalRounded - $serverTotalRounded) > 0.01)
        {
            $tampered = true;
        }

        if ($tampered)
        {
            $incidentKey = 'incident:' . uniqid();
            Cache::put($incidentKey, [
                'type'         => 'checkout_tampering',
                'ip'           => $request->ip(),
                'user_id'      => \Illuminate\Support\Facades\Auth::id(),
                'endpoint'     => $request->path(),
                'client_total' => $clientTotal,
                'server_total' => $serverTotal,
                'ts'           => now()->toIso8601String(),
            ], now()->addHours(2));

            $incidents = Cache::get('incidents', []);
            $incidents[] = $incidentKey;
            Cache::put('incidents', array_slice($incidents, -500), now()->addHours(2));

            Cache::increment('stats:tampering_attempts');

            Log::warning('Checkout potential tampering detected', [
                'ip'     => $request->ip(),
                'client' => $clientTotal,
                'server' => $serverTotal,
            ]);
        }

        $request->merge(['items' => $correctedItems, 'total' => $serverTotal]);

        return $next($request);
    }
}
