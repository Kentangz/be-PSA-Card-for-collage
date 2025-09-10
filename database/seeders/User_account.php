<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class User_account extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Lili',
            'email' => 'lili@example.com',
            'phone_number' => '+62123456790',
            'role' => 'user',
            'password' => Hash::make('123123'),
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Lala',
            'email' => 'lala@example.com',
            'phone_number' => '+62123456791',
            'role' => 'user',
            'password' => Hash::make('123123'),
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Lulu',
            'email' => 'lulu@example.com',
            'phone_number' => '+62123456792',
            'role' => 'user',
            'password' => Hash::make('123123'),
            'is_active' => true,
        ]);
    }
}
