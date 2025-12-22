<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;



class DoSProtection
{
    protected $maxRequests = 5; 
    protected $decayMinutes = 1; 
    protected $blockDurationMinutes = 20; 

    protected $endpointsLimit = [
        'checkout' => 8,
        'login' => 5,
        'admin' => 20,
    ];

    public function handle(Request $request, Closure $next): Response
    {
        $ip = $request->ip();

        if (str_starts_with($request->path(), 'admin/security')) {
            return $next($request);
        }

        if ($this->isBlocked($ip)) 
        {
            $this->logEv('blocked_access', $request, ['blocked' => true]);
            return response()->json(['message' => 'Too many requests. You are temporarily blocked.'], 429);
        }

        $limit = $this->resolveLimit($request);
        $signature = $this->signature($request);
        $attempts = Cache::get($signature, 0);

        if ($attempts >= $limit) {
            if ($this->isAuthRateLimit($request)) {
                $retryAfter = $this->decayMinutes * 60;

                $this->logEv('login_rate_limit', $request, [
                    'attempts'    => $attempts,
                    'blocked'     => false,
                    'retry_after' => $retryAfter,
                ]);
                \Illuminate\Support\Facades\Log::warning('Security login_rate_limit', [
                    'ip'          => $ip,
                    'endpoint'    => $request->path(),
                    'attempts'    => $attempts,
                    'retry_after' => $retryAfter,
                    'time'        => now()->toIso8601String(),
                ]);
                return response()
                    ->json(['message' => "Too many attempts. Try again in {$retryAfter} seconds."], 429)
                    ->withHeaders(['Retry-After' => (string) $retryAfter]);
            }

            $this->block($ip, $request, $attempts);
            return response()->json(['message' => 'Too many requests. Try later.'], 429);
        }

        Cache::put($signature, $attempts + 1, now()->addMinutes($this->decayMinutes));

        return $next($request);
    }

    private function signature(Request $request)
    {
        return 'sign:'.$request->ip().'|'.$request->path();
    }

    private function isAuthRateLimit(Request $request): bool
    {
        $path = $request->path();

        return str_contains($path, 'login') || str_contains($path, 'password');
    }

    private function block(string $ip, Request $request, int $attempts)
    {
        Cache::put('blocked:'.$ip, [
            'ip' => $ip,
            'endpoint' => $request->path(),
            'attempts' => $attempts,
            'blocked_at' => now()->toIso8601String(),
            'expires_at' => now()->addMinutes($this->blockDurationMinutes)->toIso8601String(),
        ], now()->addMinutes($this->blockDurationMinutes));

        $list = Cache::get('blocked:list', []);
        $list[$ip] = now()->getTimestamp();
        Cache::put('blocked:list', $list, now()->addHours(12));
        
        $incidentKey = 'incident:' . uniqid();
        Cache::put($incidentKey, [
            'type' => 'dos_attempt',
            'ip' => $ip,
            'endpoint' => $request->path(),
            'attempts' => $attempts,
            'ts' => now()->toIso8601String(),
        ], now()->addHours(12));

        $incidents = Cache::get('incidents', []);
        $incidents[] = $incidentKey;
        Cache::put('incidents', array_slice($incidents, -500), now()->addHours(12));

        Cache::increment('stats:dos_attempts');

        $this->logEv('dos_block', $request, ['attempts' => $attempts]);
    }

    private function isBlocked(string $ip) : bool
    {
        return Cache::has('blocked:'.$ip);
    }

    private function resolveLimit(Request $request) : int
    {
        foreach ($this->endpointsLimit as $segment => $limit) {
            if (str_contains($request->path(), $segment)) {
                return $limit;
            }
        }
        return $this->maxRequests;
    }

    private function logEv(string $type, Request $request, array $extra=[]) : void
    {
        Log::warning("Security {$type}", array_merge([
            'ip' => $request->ip(),
            'endpoint' => $request->path(),
            'agent' => $request->userAgent(),
            'time' => now()->toIso8601String(),
        ], $extra));
    }
}
