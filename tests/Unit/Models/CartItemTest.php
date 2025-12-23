<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\CartItem;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class CartItemTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        CartItem::setConnectionResolver($resolver);
        Cart::setConnectionResolver($resolver);
        Product::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_belongs_to_cart_relationship(): void
    {
        $this->setUpConnectionResolver();
        $cartItem = new CartItem();

        $this->assertInstanceOf(BelongsTo::class, $cartItem->cart());
        $this->assertInstanceOf(Cart::class, $cartItem->cart()->getRelated());
    }

    #[Test]
    public function it_belongs_to_shopping_cart_relationship(): void
    {
        $this->setUpConnectionResolver();
        $cartItem = new CartItem();

        $this->assertInstanceOf(BelongsTo::class, $cartItem->shoppingCart());
        $this->assertInstanceOf(Cart::class, $cartItem->shoppingCart()->getRelated());
    }

    #[Test]
    public function it_belongs_to_product_relationship(): void
    {
        $this->setUpConnectionResolver();
        $cartItem = new CartItem();

        $this->assertInstanceOf(BelongsTo::class, $cartItem->product());
        $this->assertInstanceOf(Product::class, $cartItem->product()->getRelated());
    }

    #[Test]
    public function it_casts_quantity_to_integer(): void
    {
        $cartItem = new CartItem();

        $casts = $cartItem->getCasts();
        $this->assertSame('integer', $casts['quantity']);
    }

    #[Test]
    public function it_has_no_timestamps(): void
    {
        $cartItem = new CartItem();

        $this->assertFalse($cartItem->usesTimestamps());
    }
}
