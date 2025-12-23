<?php

declare(strict_types=1);

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\ConnectionResolverInterface;
use Illuminate\Database\Connection;

final class RoleTest extends TestCase
{
    private function setUpConnectionResolver(): void
    {
        $pdo = $this->createMock(\PDO::class);
        $connection = new Connection($pdo);
        $resolver = $this->createMock(ConnectionResolverInterface::class);
        $resolver->method('connection')->willReturn($connection);
        Role::setConnectionResolver($resolver);
        User::setConnectionResolver($resolver);
    }
    #[Test]
    public function it_has_many_users_relationship(): void
    {
        $this->setUpConnectionResolver();
        $role = new Role();

        $this->assertInstanceOf(HasMany::class, $role->users());
        $this->assertInstanceOf(User::class, $role->users()->getRelated());
    }

    #[Test]
    public function it_has_no_timestamps(): void
    {
        $role = new Role();

        $this->assertFalse($role->usesTimestamps());
    }

    #[Test]
    public function it_uses_uuid_as_primary_key(): void
    {
        $role = new Role();

        $this->assertSame('string', $role->getKeyType());
        $this->assertFalse($role->getIncrementing());
    }
}
