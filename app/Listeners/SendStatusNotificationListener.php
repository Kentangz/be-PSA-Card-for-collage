<?php

namespace App\Listeners;

use App\Events\StatusCreatedEvent;
use App\Mail\StatusNotificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendStatusNotificationListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(StatusCreatedEvent $event): void
    {
        try {
            $card = $event->card->load(['user', 'images']);
            $status = $event->status;

            Mail::to($card->user->email)->send(new StatusNotificationMail($card, $status));

            Log::info('Status notification email sent', [
                'card_id' => $card->id,
                'user_email' => $card->user->email,
                'status' => $status->status
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send status notification email', [
                'card_id' => $event->card->id,
                'error' => $e->getMessage()
            ]);
        }
    }
}
