<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\ProductSpec;
use App\Models\Product;
use App\Models\ProductSpecAttribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class ProductSpecTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        ProductSpec::setConnectionResolver($resolver);
        Product::setConnectionResolver($resolver);
        ProductSpecAttribute::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_belongs_to_product_relationship(): void
    {
        $this->setUpConnectionResolver();
        $productSpec = new ProductSpec();

        $this->assertInstanceOf(BelongsTo::class, $productSpec->product());
        $this->assertInstanceOf(Product::class, $productSpec->product()->getRelated());
    }

    #[Test]
    public function it_belongs_to_spec_attribute_relationship(): void
    {
        $this->setUpConnectionResolver();
        $productSpec = new ProductSpec();

        $this->assertInstanceOf(BelongsTo::class, $productSpec->specAttribute());
        $this->assertInstanceOf(ProductSpecAttribute::class, $productSpec->specAttribute()->getRelated());
    }

    #[Test]
    public function it_has_no_updated_at_timestamp(): void
    {
        $productSpec = new ProductSpec();

        $this->assertNull($productSpec->getUpdatedAtColumn());
    }

    #[Test]
    public function it_uses_uuid_as_primary_key(): void
    {
        $productSpec = new ProductSpec();

        $this->assertSame('string', $productSpec->getKeyType());
        $this->assertFalse($productSpec->getIncrementing());
    }
}
