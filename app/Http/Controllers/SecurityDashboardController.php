<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class SecurityDashboardController extends Controller
{
    public function index()
    {
        $blockedList = Cache::get('blocked:list', []);
        
        $stats = [
            'blocked_ips'       => count($blockedList),
            'total_incidents'   => count(Cache::get('incidents', [])),
            'dos_attacks'       => Cache::get('stats:dos_attempts', 0),
            'tampering_attempts'=> Cache::get('stats:tampering_attempts', 0),
        ];

        $blockedIPs = [];
        foreach (array_keys($blockedList) as $ip) {
            $data = Cache::get('blocked:' . $ip);
            if ($data) {
                $blockedIPs[] = $data;
            }
        }

        $incidentKeys = Cache::get('incidents', []);
        $recentIncidents = [];
        foreach (array_slice(array_reverse($incidentKeys), 0, 50) as $key) {
            $incident = Cache::get($key);
            if ($incident) {
                $recentIncidents[] = $incident;
            }
        }

        return Inertia::render('Admin/Security', [
            'stats' => $stats,
            'blockedIPs' => $blockedIPs,
            'recentIncidents' => $recentIncidents,
        ]);
    }

    public function unblock()
    {
        $ip = request('ip');
        if ($ip) {
            Cache::forget('blocked:' . $ip);
            $list = Cache::get('blocked:list', []);
            unset($list[$ip]);
            Cache::put('blocked:list', $list, now()->addHours(12));
        }
        return back();
    }

    public function clearIncidents()
    {
        $keys = Cache::get('incidents', []);
        foreach ($keys as $key) {
            Cache::forget($key);
        }
        Cache::put('incidents', [], now()->addHours(12));
        Cache::put('stats:dos_attempts', 0);
        Cache::put('stats:tampering_attempts', 0);
        return back();
    }
}
