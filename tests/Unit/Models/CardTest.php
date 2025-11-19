<?php

namespace Tests\Unit\Models;

use App\Models\Card;
use App\Models\User;
use App\Models\Batch;
use Tests\TestCase;

class CardTest extends TestCase
{
  public function test_card_model_has_correct_fillable_attributes()
  {
    $card = new Card();

    $expectedFillable = [
      "name",
      "year",
      "brand",
      "serial_number",
      "user_id",
      "batch_id",
      "queue_entry_id",
      "grade",
      "payment_url"
    ];

    $this->assertEquals($expectedFillable, $card->getFillable());
  }

  public function test_card_belongs_to_user_relationship()
  {
    $card = new Card();

    $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\BelongsTo::class, $card->user());
  }

  public function test_card_belongs_to_batch_relationship()
  {
    $card = new Card();
    $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\BelongsTo::class, $card->batch());
  }
}
