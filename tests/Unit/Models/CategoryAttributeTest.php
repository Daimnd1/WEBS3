<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\CategoryAttribute;
use App\Models\Category;
use App\Models\ProductSpecAttribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class CategoryAttributeTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        CategoryAttribute::setConnectionResolver($resolver);
        Category::setConnectionResolver($resolver);
        ProductSpecAttribute::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_belongs_to_category_relationship(): void
    {
        $this->setUpConnectionResolver();
        $categoryAttribute = new CategoryAttribute();

        $this->assertInstanceOf(BelongsTo::class, $categoryAttribute->category());
        $this->assertInstanceOf(Category::class, $categoryAttribute->category()->getRelated());
    }

    #[Test]
    public function it_belongs_to_spec_attribute_relationship(): void
    {
        $this->setUpConnectionResolver();
        $categoryAttribute = new CategoryAttribute();

        $this->assertInstanceOf(BelongsTo::class, $categoryAttribute->specAttribute());
        $this->assertInstanceOf(ProductSpecAttribute::class, $categoryAttribute->specAttribute()->getRelated());
    }

    #[Test]
    public function it_has_no_timestamps(): void
    {
        $categoryAttribute = new CategoryAttribute();

        $this->assertFalse($categoryAttribute->usesTimestamps());
    }

    #[Test]
    public function it_uses_uuid_as_primary_key(): void
    {
        $categoryAttribute = new CategoryAttribute();

        $this->assertSame('string', $categoryAttribute->getKeyType());
        $this->assertFalse($categoryAttribute->getIncrementing());
    }
}
