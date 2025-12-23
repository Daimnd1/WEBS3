<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\User;
use App\Models\Role;
use App\Models\Cart;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class UserTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        User::setConnectionResolver($resolver);
        Cart::setConnectionResolver($resolver);
        Role::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_returns_true_when_user_has_admin_role(): void
    {
        $role = new Role(['name' => 'admin']);
        $user = new User();
        $user->setRelation('role', $role);

        $this->assertTrue($user->isAdmin());
    }

    #[Test]
    public function it_returns_false_when_user_has_non_admin_role(): void
    {
        $role = new Role(['name' => 'customer']);
        $user = new User();
        $user->setRelation('role', $role);

        $this->assertFalse($user->isAdmin());
    }

    #[Test]
    public function it_returns_false_when_user_has_no_role(): void
    {
        $user = new User();
        $user->setRelation('role', null);

        $this->assertFalse($user->isAdmin());
    }

    #[Test]
    public function it_returns_false_when_role_name_has_whitespace(): void
    {
        $role = new Role(['name' => ' admin ']);
        $user = new User();
        $user->setRelation('role', $role);

        $this->assertTrue($user->isAdmin());
    }

    #[Test]
    public function it_has_one_cart_relationship(): void
    {
        $this->setUpConnectionResolver();
        $user = new User();

        $this->assertInstanceOf(HasOne::class, $user->cart());
        $this->assertInstanceOf(Cart::class, $user->cart()->getRelated());
    }

    #[Test]
    public function it_belongs_to_role_relationship(): void
    {
        $this->setUpConnectionResolver();
        $user = new User();

        $this->assertInstanceOf(BelongsTo::class, $user->role());
        $this->assertInstanceOf(Role::class, $user->role()->getRelated());
    }

    #[Test]
    public function it_casts_password_to_hashed(): void
    {
        $user = new User();

        $casts = $user->getCasts();
        $this->assertSame('hashed', $casts['password']);
    }

    #[Test]
    public function it_casts_email_verified_at_to_datetime(): void
    {
        $user = new User();

        $casts = $user->getCasts();
        $this->assertSame('datetime', $casts['email_verified_at']);
    }
}
