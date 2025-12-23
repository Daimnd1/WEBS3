<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\Orders;
use App\Models\User;
use App\Models\OrderStatuses;
use App\Models\OrderDetails;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class OrdersTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        Orders::setConnectionResolver($resolver);
        User::setConnectionResolver($resolver);
        OrderStatuses::setConnectionResolver($resolver);
        OrderDetails::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_belongs_to_user_relationship(): void
    {
        $this->setUpConnectionResolver();
        $order = new Orders();

        $this->assertInstanceOf(BelongsTo::class, $order->user());
        $this->assertInstanceOf(User::class, $order->user()->getRelated());
    }

    #[Test]
    public function it_belongs_to_order_status_relationship(): void
    {
        $this->setUpConnectionResolver();
        $order = new Orders();

        $this->assertInstanceOf(BelongsTo::class, $order->orderStatus());
        $this->assertInstanceOf(OrderStatuses::class, $order->orderStatus()->getRelated());
    }

    #[Test]
    public function it_has_many_order_details_relationship(): void
    {
        $this->setUpConnectionResolver();
        $order = new Orders();

        $this->assertInstanceOf(HasMany::class, $order->orderDetails());
        $this->assertInstanceOf(OrderDetails::class, $order->orderDetails()->getRelated());
    }

    #[Test]
    public function it_has_no_timestamps(): void
    {
        $order = new Orders();

        $this->assertFalse($order->usesTimestamps());
    }

    #[Test]
    public function it_casts_created_at_to_datetime(): void
    {
        $order = new Orders();

        $casts = $order->getCasts();
        $this->assertSame('datetime', $casts['created_at']);
    }
}
