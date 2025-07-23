<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'phone_number' => '+62123456789',
            'role' => 'admin',
            'password' => 'rahasia'
        ]);

        Grade::factory()->create([
            "grade" => "A"
        ]);

        Grade::factory()->create([
            "grade" => "B"
        ]);

        Grade::factory()->create([
            "grade" => "C"
        ]);
    }
}
