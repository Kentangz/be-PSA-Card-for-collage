<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
  use RefreshDatabase;

  public function test_user_can_login_with_correct_credentials()
  {
    $user = User::factory()->create([
      'email' => 'test@example.com',
      'password' => bcrypt('pass123'),
      'is_active' => true
    ]);

    $response = $this->postJson('/api/login', [
      'email' => 'test@example.com',
      'password' => 'pass123',
    ]);

    $response->assertStatus(200)
      ->assertJsonStructure([
        'message',
        'token',
        'user'
      ]);
  }

  public function test_user_cannot_login_with_wrong_password()
  {
    $user = User::factory()->create([
      'email' => 'wrong@example.com',
      'password' => bcrypt('pass123'),
      'is_active' => true
    ]);
    
    $response = $this->postJson('/api/login', [
      'email' => 'wrong@example.com',
      'password' => 'salahbanget',
    ]);

    $response->assertStatus(401)
      ->assertJson(['message' => 'Invalid credentials']);
  }

  public function test_inactive_user_cannot_login()
  {
    $user = User::factory()->create([
      'email' => 'inactive@example.com',
      'password' => bcrypt('pass123'),
      'is_active' => false
    ]);

    $response = $this->postJson('/api/login', [
      'email' => 'inactive@example.com',
      'password' => 'pass123',
    ]);

    $response->assertStatus(403)
      ->assertJson([
        'message' => 'Login failed: your account has been deactivate'
      ]);
  }

  public function test_login_requires_email_and_password()
  {
    $response = $this->postJson('/api/login', []);

    $response->assertStatus(422)
      ->assertJsonValidationErrors(['email', 'password']);
  }
}
