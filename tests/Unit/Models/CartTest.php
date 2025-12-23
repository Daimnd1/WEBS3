<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\Cart;
use App\Models\User;
use App\Models\CartItem;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class CartTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        Cart::setConnectionResolver($resolver);
        User::setConnectionResolver($resolver);
        CartItem::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_belongs_to_user_relationship(): void
    {
        $this->setUpConnectionResolver();
        $cart = new Cart();

        $this->assertInstanceOf(BelongsTo::class, $cart->user());
        $this->assertInstanceOf(User::class, $cart->user()->getRelated());
    }

    #[Test]
    public function it_has_many_items_relationship(): void
    {
        $this->setUpConnectionResolver();
        $cart = new Cart();

        $this->assertInstanceOf(HasMany::class, $cart->items());
        $this->assertInstanceOf(CartItem::class, $cart->items()->getRelated());
    }

    #[Test]
    public function it_uses_uuid_as_primary_key(): void
    {
        $cart = new Cart();

        $this->assertSame('string', $cart->getKeyType());
        $this->assertFalse($cart->getIncrementing());
    }
}
