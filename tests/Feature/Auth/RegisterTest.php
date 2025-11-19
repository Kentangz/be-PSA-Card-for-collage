<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_with_valid_data()
    {
        $payload = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'phone_number' => '081234567890',
            'password' => 'pass123',
            'password_confirmation' => 'pass123',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'User registered successfully'
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
            'phone_number' => '081234567890',
        ]);

        $user = User::where('email', 'newuser@example.com')->first();
        $this->assertNotEquals('pass123', $user->password);
    }

    public function test_register_requires_name_email_password_and_phone()
    {
        $response = $this->postJson('/api/register', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password', 'phone_number']);
    }

    public function test_register_requires_password_confirmation()
    {
        $payload = [
            'name' => 'User Test',
            'email' => 'test@example.com',
            'phone_number' => '08111111111',
            'password' => 'pass123',
            'password_confirmation' => 'pass456',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_cannot_register_with_duplicate_email_or_phone()
    {
        User::factory()->create([
            'email' => 'existing@example.com',
            'phone_number' => '081234567890'
        ]);

        $payload = [
            'name' => 'Another User',
            'email' => 'existing@example.com',
            'phone_number' => '081234567890',
            'password' => 'pass123',
            'password_confirmation' => 'pass123',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'phone_number']);
    }
}