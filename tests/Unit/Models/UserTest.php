<?php

namespace Tests\Unit\Models;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
  public function test_user_model_has_correct_fillable_attributes()
  {
    $user = new User();

    $expectedFillables = [
      'name',
      'email',
      'phone_number',
      'password',
      'role',
      'is_active',
    ];

    $this->assertEquals($expectedFillables, $user->getFillable());
  }

  public function test_user_hides_password_and_remember_token_when_converted_to_array()
  {
    $user = new User([
      'name' => 'Test User',
      'password' => 'rahasia',
      'remember_token' => 'token123'
    ]);

    $arrayUser = $user->toArray();

    $this->assertArrayNotHasKey('password', $arrayUser);
    $this->assertArrayNotHasKey('remember_token', $arrayUser);
    $this->assertArrayHasKey('name', $arrayUser);
  }
}
