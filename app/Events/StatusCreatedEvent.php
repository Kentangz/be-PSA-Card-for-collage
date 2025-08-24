<?php

namespace App\Events;

use App\Models\Status;
use App\Models\Card;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StatusCreatedEvent
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public Status $status;
  public Card $card;

  /**
   * Create a new event instance.
   */
  public function __construct(Status $status, Card $card)
  {
    $this->status = $status;
    $this->card = $card;
  }
}
