<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Batch>
 */
class BatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'batch_number' => fake()->randomNumber(3),
            'register_number' => fake()->bothify('REG-####'),
            'services' => 'Regular',
            'category' => 'PSA-USA',
            'is_active' => true, // Default aktif
        ];
    }
}
