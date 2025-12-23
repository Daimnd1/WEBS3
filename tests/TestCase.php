<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        
        if (!file_exists(public_path('build'))) {
            mkdir(public_path('build'), 0755, true);
        }
        
        if (!file_exists(public_path('build/manifest.json'))) {
            file_put_contents(
                public_path('build/manifest.json'),
                json_encode([
                    'resources/js/app.tsx' => [
                        'file' => 'assets/app.js',
                        'src' => 'resources/js/app.tsx',
                        'isEntry' => true,
                    ],
                    'resources/css/app.css' => [
                        'file' => 'assets/app.css',
                        'src' => 'resources/css/app.css',
                        'isEntry' => true,
                    ],
                ], JSON_PRETTY_PRINT)
            );
        }
    }
}
