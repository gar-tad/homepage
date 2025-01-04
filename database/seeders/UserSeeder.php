<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Product;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->has(
                Company::factory()
                    ->count(3)
            )
            ->count(3)
            ->create();
    }
}
