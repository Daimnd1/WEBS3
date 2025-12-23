<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\OrderStatuses;
use App\Models\Orders;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class OrderStatusesTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        OrderStatuses::setConnectionResolver($resolver);
        Orders::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_has_many_orders_relationship(): void
    {
        $this->setUpConnectionResolver();
        $orderStatus = new OrderStatuses();

        $this->assertInstanceOf(HasMany::class, $orderStatus->orders());
        $this->assertInstanceOf(Orders::class, $orderStatus->orders()->getRelated());
    }

    #[Test]
    public function it_has_no_timestamps(): void
    {
        $orderStatus = new OrderStatuses();

        $this->assertFalse($orderStatus->usesTimestamps());
    }

    #[Test]
    public function it_casts_created_at_to_datetime(): void
    {
        $orderStatus = new OrderStatuses();

        $casts = $orderStatus->getCasts();
        $this->assertSame('datetime', $casts['created_at']);
    }
}
