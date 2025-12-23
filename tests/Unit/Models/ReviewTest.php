<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\Review;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class ReviewTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        Review::setConnectionResolver($resolver);
        User::setConnectionResolver($resolver);
        Product::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_belongs_to_user_relationship(): void
    {
        $this->setUpConnectionResolver();
        $review = new Review();

        $this->assertInstanceOf(BelongsTo::class, $review->user());
        $this->assertInstanceOf(User::class, $review->user()->getRelated());
    }

    #[Test]
    public function it_belongs_to_product_relationship(): void
    {
        $this->setUpConnectionResolver();
        $review = new Review();

        $this->assertInstanceOf(BelongsTo::class, $review->product());
        $this->assertInstanceOf(Product::class, $review->product()->getRelated());
    }

    #[Test]
    public function it_casts_rating_to_integer(): void
    {
        $review = new Review();

        $casts = $review->getCasts();
        $this->assertSame('integer', $casts['rating']);
    }

    #[Test]
    public function it_casts_created_at_to_datetime(): void
    {
        $review = new Review();

        $casts = $review->getCasts();
        $this->assertSame('datetime', $casts['created_at']);
    }

    #[Test]
    public function it_has_no_updated_at_timestamp(): void
    {
        $review = new Review();

        $this->assertNull($review->getUpdatedAtColumn());
    }

    #[Test]
    public function it_uses_uuid_as_primary_key(): void
    {
        $review = new Review();

        $this->assertSame('string', $review->getKeyType());
        $this->assertFalse($review->getIncrementing());
    }
}
