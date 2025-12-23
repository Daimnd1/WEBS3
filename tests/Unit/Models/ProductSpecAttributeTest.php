<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\ProductSpecAttribute;
use App\Models\ProductSpec;
use App\Models\CategoryAttribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class ProductSpecAttributeTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        ProductSpecAttribute::setConnectionResolver($resolver);
        ProductSpec::setConnectionResolver($resolver);
        CategoryAttribute::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_has_many_specs_relationship(): void
    {
        $this->setUpConnectionResolver();
        $specAttribute = new ProductSpecAttribute();

        $this->assertInstanceOf(HasMany::class, $specAttribute->specs());
        $this->assertInstanceOf(ProductSpec::class, $specAttribute->specs()->getRelated());
    }

    #[Test]
    public function it_has_many_category_attributes_relationship(): void
    {
        $this->setUpConnectionResolver();
        $specAttribute = new ProductSpecAttribute();

        $this->assertInstanceOf(HasMany::class, $specAttribute->categoryAttributes());
        $this->assertInstanceOf(CategoryAttribute::class, $specAttribute->categoryAttributes()->getRelated());
    }

    #[Test]
    public function it_has_no_updated_at_timestamp(): void
    {
        $specAttribute = new ProductSpecAttribute();

        $this->assertNull($specAttribute->getUpdatedAtColumn());
    }

    #[Test]
    public function it_uses_uuid_as_primary_key(): void
    {
        $specAttribute = new ProductSpecAttribute();

        $this->assertSame('string', $specAttribute->getKeyType());
        $this->assertFalse($specAttribute->getIncrementing());
    }
}
