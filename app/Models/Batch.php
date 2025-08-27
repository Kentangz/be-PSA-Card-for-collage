<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Batch extends Model
{
  protected $fillable = [
    'batch_number',
    'register_number',
    'services',
    'category',
    'is_active'
  ];

  protected $casts = [
    'is_active' => 'boolean'
  ];

  // Relationship
  public function cards()
  {
    return $this->hasMany(Card::class);
  }

  // Auto generate batch_number dan register_number
  protected static function boot()
  {
    parent::boot();

    static::creating(function ($batch) {
      // Generate batch_number
      $lastBatch = static::orderBy('id', 'desc')->first();
      $nextNumber = $lastBatch ? (intval(str_replace('Batch ', '', $lastBatch->batch_number)) + 1) : 1;
      $batch->batch_number = "Batch {$nextNumber}";

      // Generate register_number: B{batch_sequence}{6_random_alphanumeric}
      do {
        $randomString = Str::upper(Str::random(6)); // 6 random alphanumeric uppercase
        $registerNumber = "B{$nextNumber}{$randomString}";
      } while (static::where('register_number', $registerNumber)->exists());

      $batch->register_number = $registerNumber;
    });
  }
}
