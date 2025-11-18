<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Get the users that have this role.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
