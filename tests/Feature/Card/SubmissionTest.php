<?php

namespace Tests\Feature\Card;

use App\Models\Batch;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_submit_card_with_valid_data_and_active_batch()
    {
        Storage::fake('public');

        $user = User::factory()->create();

        $batch = Batch::factory()->create([
            'is_active' => true
        ]);

        $file = UploadedFile::fake()->image('pokemon_charizard.jpg');

        $payload = [
            'name' => 'Charizard Base Set',
            'year' => 1999,
            'brand' => 'Pokemon TCG',
            'batch_id' => $batch->id,
            'images' => [$file]
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/card', $payload);

        $response->assertStatus(200);

        $this->assertDatabaseHas('cards',
        [
            'name' => 'Charizard Base Set',
            'user_id' => $user->id,
            'batch_id' => $batch->id,
        ]);

        $this->assertDatabaseHas('statuses',
        [
            'status' => 'submit',
        ]);

        /** @var \Illuminate\Support\Testing\Fakes\StorageFake $disk */
        $disk = Storage::disk('public');
        $disk->assertExists('card-images/' . $file->hashName());
    }

    public function test_cannot_submit_card_if_batch_is_inactive()
    {
        $user = User::factory()->create();
        $inactiveBatch = Batch::factory()->create([
            'is_active' => false
        ]);
        
        $file = UploadedFile::fake()->image('card.jpg');

        $payload = [
            'name' => 'Test Card',
            'year' => 2024,
            'brand' => 'Test Brand',
            'batch_id' => $inactiveBatch->id,
            'images' => [$file]
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/card', $payload);

        $response->assertStatus(422)
            ->assertJson(['message' => 'Selected batch is not active for submissions']);

        $this->assertDatabaseCount('cards', 0);
    }

    public function test_submission_requires_image_upload()
    {
        $user = User::factory()->create();
        $batch = Batch::factory()->create(['is_active' => true]);

        $payload = [
            'name' => 'Test Card',
            'year' => 2024,
            'brand' => 'Test Brand',
            'batch_id' => $batch->id,
            'images' => []
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/card', $payload);
            
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['images']);
    }

    public function test_guest_cannot_submit_card()
    {
        $response = $this->postJson('/api/card', []);

        $response->assertStatus(401);
    }
}
