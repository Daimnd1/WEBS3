<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductSpecAttribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class CategoryTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        Category::setConnectionResolver($resolver);
        Product::setConnectionResolver($resolver);
        ProductSpecAttribute::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_has_many_products_relationship(): void
    {
        $this->setUpConnectionResolver();
        $category = new Category();

        $this->assertInstanceOf(HasMany::class, $category->products());
        $this->assertInstanceOf(Product::class, $category->products()->getRelated());
    }

    #[Test]
    public function it_belongs_to_many_spec_attributes_relationship(): void
    {
        $this->setUpConnectionResolver();
        $category = new Category();

        $this->assertInstanceOf(BelongsToMany::class, $category->specAttributes());
        $this->assertInstanceOf(ProductSpecAttribute::class, $category->specAttributes()->getRelated());
    }

    #[Test]
    public function it_has_no_updated_at_timestamp(): void
    {
        $category = new Category();

        $this->assertNull($category->getUpdatedAtColumn());
    }

    #[Test]
    public function it_uses_uuid_as_primary_key(): void
    {
        $category = new Category();

        $this->assertSame('string', $category->getKeyType());
        $this->assertFalse($category->getIncrementing());
    }
}
