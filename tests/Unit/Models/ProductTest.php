<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductSpec;
use App\Models\Review;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class ProductTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        Product::setConnectionResolver($resolver);
        Category::setConnectionResolver($resolver);
        ProductSpec::setConnectionResolver($resolver);
        Review::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_returns_fixed_rating_of_4_5(): void
    {
        $product = new Product();

        $this->assertSame(4.5, $product->rating);
    }

    #[Test]
    public function it_returns_integer_for_reviews_count(): void
    {
        $product = new Product();

        $this->assertIsInt($product->reviews);
    }

    #[Test]
    public function it_returns_integer_in_valid_range(): void
    {
        $product = new Product();
        $reviews = $product->reviews;

        $this->assertGreaterThanOrEqual(50, $reviews);
        $this->assertLessThanOrEqual(200, $reviews);
    }

    #[Test]
    public function it_belongs_to_category_relationship(): void
    {
        $this->setUpConnectionResolver();
        $product = new Product();

        $this->assertInstanceOf(BelongsTo::class, $product->category());
        $this->assertInstanceOf(Category::class, $product->category()->getRelated());
    }

    #[Test]
    public function it_has_many_specs_relationship(): void
    {
        $this->setUpConnectionResolver();
        $product = new Product();

        $this->assertInstanceOf(HasMany::class, $product->specs());
        $this->assertInstanceOf(ProductSpec::class, $product->specs()->getRelated());
    }

    #[Test]
    public function it_has_many_reviews_relationship(): void
    {
        $this->setUpConnectionResolver();
        $product = new Product();

        $this->assertInstanceOf(HasMany::class, $product->reviews());
        $this->assertInstanceOf(Review::class, $product->reviews()->getRelated());
    }

    #[Test]
    public function it_casts_price_to_integer(): void
    {
        $product = new Product();

        $casts = $product->getCasts();
        $this->assertSame('integer', $casts['price']);
    }

    #[Test]
    public function it_casts_original_price_to_integer(): void
    {
        $product = new Product();

        $casts = $product->getCasts();
        $this->assertSame('integer', $casts['original_price']);
    }

    #[Test]
    public function it_has_no_updated_at_timestamp(): void
    {
        $product = new Product();

        $this->assertNull($product->getUpdatedAtColumn());
    }
}
