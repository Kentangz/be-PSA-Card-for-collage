<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserBatchQueue extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'batch_id',
        'queue_order'
    ];

    protected $casts = [
        'queue_order' => 'integer',
    ];

    /**
     * Get the user that owns the queue position.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the batch that owns the queue position.
     */
    public function batch(): BelongsTo
    {
        return $this->belongsTo(Batch::class);
    }

    /**
     * Get the next queue order for a batch
     */
    public static function getNextQueueOrder(int $batchId): int
    {
        $maxOrder = self::where('batch_id', $batchId)->max('queue_order');
        return ($maxOrder ?? 0) + 1;
    }

    /**
     * Reorder queue positions after a user is removed
     */
    public static function reorderAfterRemoval(int $batchId, int $removedOrder): void
    {
        self::where('batch_id', $batchId)
            ->where('queue_order', '>', $removedOrder)
            ->decrement('queue_order');
    }
}
