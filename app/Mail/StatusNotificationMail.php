<?php

namespace App\Mail;

use App\Models\Card;
use App\Models\Status;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class StatusNotificationMail extends Mailable
{
  use Queueable, SerializesModels;

  public Card $card;
  public Status $status;

  /**
   * Create a new message instance.
   */
  public function __construct(Card $card, Status $status)
  {
    $this->card = $card;
    $this->status = $status;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Status Card Update',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    return new Content(
      view: 'emails.status-notification',
      with: [
        'userName' => $this->card->user->name,
        'cardName' => $this->card->name,
        'cardYear' => $this->card->year,
        'cardBrand' => $this->card->brand,
        'cardSerialNumber' => $this->card->serial_number,
        'newStatus' => $this->status->status,
        'cardGrade' => $this->card->grade,
        'cardImages' => $this->card->images,
        'statusDate' => $this->status->created_at->format('d M Y, H:i'),
      ],
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
