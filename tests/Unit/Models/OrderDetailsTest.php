<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\OrderDetails;
use App\Models\Orders;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class OrderDetailsTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        OrderDetails::setConnectionResolver($resolver);
        Orders::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_belongs_to_order_relationship(): void
    {
        $this->setUpConnectionResolver();
        $orderDetail = new OrderDetails();

        $this->assertInstanceOf(BelongsTo::class, $orderDetail->order());
        $this->assertInstanceOf(Orders::class, $orderDetail->order()->getRelated());
    }

    #[Test]
    public function it_casts_quantity_to_integer(): void
    {
        $orderDetail = new OrderDetails();

        $casts = $orderDetail->getCasts();
        $this->assertSame('integer', $casts['quantity']);
    }

    #[Test]
    public function it_casts_unit_price_to_decimal(): void
    {
        $orderDetail = new OrderDetails();

        $casts = $orderDetail->getCasts();
        $this->assertSame('decimal:2', $casts['unit_price']);
    }

    #[Test]
    public function it_has_no_timestamps(): void
    {
        $orderDetail = new OrderDetails();

        $this->assertFalse($orderDetail->usesTimestamps());
    }
}
