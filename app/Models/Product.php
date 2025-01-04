<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'base_price'
    ];

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class);
    }
}
