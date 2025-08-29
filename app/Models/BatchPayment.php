<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatchPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'batch_id',
        'user_id',
        'payment_url',
        'total_submissions',
        'is_sent',
        'sent_at',
    ];

    protected $casts = [
        'is_sent' => 'boolean',
        'sent_at' => 'datetime',
    ];

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function submissions()
    {
        return $this->hasManyThrough(
            Card::class,
            User::class,
            'id', 
            'user_id', 
            'user_id', 
            'id' 
        )->where('cards.batch_id', $this->batch_id);
    }

    public function markAsSent()
    {
        $this->update([
            'is_sent' => true,
            'sent_at' => now(),
        ]);
    }

    public function updateSubmissionPaymentUrls()
    {
        if ($this->payment_url) {
            Card::where('user_id', $this->user_id)
                ->where('batch_id', $this->batch_id)
                ->update(['payment_url' => $this->payment_url]);
        }
    }

    public function calculateTotalSubmissions()
    {
        $count = Card::where('user_id', $this->user_id)
            ->where('batch_id', $this->batch_id)
            ->count();

        $this->update(['total_submissions' => $count]);

        return $count;
    }
}
