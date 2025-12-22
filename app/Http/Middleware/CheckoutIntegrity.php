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
            $ip = $request->ip();
            $userId = Auth::id();
            
            // Block the IP immediately on price tampering
            Cache::put('blocked:'.$ip, [
                'ip' => $ip,
                'endpoint' => $request->path(),
                                'attempts' => 1,
                'reason' => 'Price tampering detected',
                'blocked_at' => now()->toIso8601String(),
                'expires_at' => now()->addMinutes(30)->toIso8601String(),
            ], now()->addMinutes(30));

            $list = Cache::get('blocked:list', []);
            $list[$ip] = now()->getTimestamp();
            Cache::put('blocked:list', $list, now()->addHours(12));
            
            // Store incident with full details for Security Dashboard
            $incidentKey = 'incident:' . uniqid();
            Cache::put($incidentKey, [
                'type' => 'checkout_tampering',
                'ip' => $ip,
                'endpoint' => $request->path(),
                'client_total' => $clientTotal,
                'server_total' => $serverTotal,
                'user_id' => $userId,
                'ts' => now()->toIso8601String(),
            ], now()->addHours(12));

            $incidents = Cache::get('incidents', []);
            $incidents[] = $incidentKey;
            Cache::put('incidents', array_slice($incidents, -500), now()->addHours(12));

            Cache::increment('stats:tampering_attempts');

            Log::warning('Checkout price tampering detected - IP BLOCKED', [
                'ip'     => $ip,
                'user_id' => $userId,
                'client' => $clientTotal,
                'server' => $serverTotal,
            ]);
            
            // Return 403 Forbidden immediately
            return response()->json([
                'message' => 'Security violation detected. Your IP has been blocked.',
                'error' => 'price_tampering'
            ], 403);
        }

        $request->merge(['items' => $correctedItems, 'total' => $serverTotal]);

        return $next($request);
    }
}
