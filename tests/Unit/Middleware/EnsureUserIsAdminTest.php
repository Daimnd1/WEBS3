<?php

declare(strict_types=1);

namespace Tests\Unit\Middleware;

use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Mockery;

final class EnsureUserIsAdminTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function it_returns_403_when_user_is_not_authenticated(): void
    {
        $middleware = new EnsureUserIsAdmin();
        $request = Mockery::mock(Request::class);
        $request->shouldReceive('user')
            ->once()
            ->andReturn(null);
        
        $next = function ($req) {
            $this->fail('Next closure should not be called when user is not authenticated');
        };

        try {
            $middleware->handle($request, $next);
            $this->fail('Expected HttpException was not thrown');
        } catch (\Symfony\Component\HttpKernel\Exception\HttpException $e) {
            $this->assertSame(403, $e->getStatusCode());
            $this->assertSame('Unauthorized. Admin access required.', $e->getMessage());
        }
    }

    #[Test]
    public function it_returns_403_when_user_is_authenticated_but_not_admin(): void
    {
        $middleware = new EnsureUserIsAdmin();
        $request = Mockery::mock(Request::class);
        $user = Mockery::mock(\App\Models\User::class);
        $user->shouldReceive('isAdmin')
            ->once()
            ->andReturn(false);
        $request->shouldReceive('user')
            ->twice()
            ->andReturn($user);
        
        $next = function ($req) {
            $this->fail('Next closure should not be called when user is not admin');
        };

        try {
            $middleware->handle($request, $next);
            $this->fail('Expected HttpException was not thrown');
        } catch (\Symfony\Component\HttpKernel\Exception\HttpException $e) {
            $this->assertSame(403, $e->getStatusCode());
            $this->assertSame('Unauthorized. Admin access required.', $e->getMessage());
        }
    }

    #[Test]
    public function it_allows_request_to_proceed_when_user_is_admin(): void
    {
        $middleware = new EnsureUserIsAdmin();
        $request = Mockery::mock(Request::class);
        $user = Mockery::mock(\App\Models\User::class);
        $user->shouldReceive('isAdmin')
            ->once()
            ->andReturn(true);
        $request->shouldReceive('user')
            ->twice()
            ->andReturn($user);
        
        $response = Mockery::mock(Response::class);
        $nextCalled = false;
        $next = function ($req) use ($request, $response, &$nextCalled) {
            $this->assertSame($request, $req);
            $nextCalled = true;
            return $response;
        };

        $result = $middleware->handle($request, $next);

        $this->assertTrue($nextCalled);
        $this->assertSame($response, $result);
    }

    #[Test]
    public function it_calls_is_admin_method_on_user(): void
    {
        $middleware = new EnsureUserIsAdmin();
        $request = Mockery::mock(Request::class);
        $user = Mockery::mock(\App\Models\User::class);
        $user->shouldReceive('isAdmin')
            ->once()
            ->andReturn(true);
        $request->shouldReceive('user')
            ->twice()
            ->andReturn($user);
        
        $response = Mockery::mock(Response::class);
        $next = function ($req) use ($response) {
            return $response;
        };

        $result = $middleware->handle($request, $next);

        $this->assertSame($response, $result);
    }
}

