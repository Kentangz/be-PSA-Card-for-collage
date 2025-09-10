<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BatchQueueEntry extends Model
{
  use HasFactory;

  protected $fillable = [
    'batch_id',
    'user_id',
    'queue_order',
    'payment_url',
    'is_sent',
  ];

  protected $casts = [
    'queue_order' => 'integer',
    'is_sent' => 'boolean',
  ];

  public function batch(): BelongsTo
  {
    return $this->belongsTo(Batch::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function cards(): HasMany
  {
    return $this->hasMany(Card::class, 'queue_entry_id');
  }
}
