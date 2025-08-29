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

  public function cards()
  {
    return $this->hasMany(Card::class);
  }

  protected static function boot()
  {
    parent::boot();

    static::creating(function ($batch) {
      $lastBatch = static::orderBy('id', 'desc')->first();
      $nextNumber = $lastBatch ? (intval(str_replace('Batch ', '', $lastBatch->batch_number)) + 1) : 1;
      $batch->batch_number = "Batch {$nextNumber}";

      do {
        $randomString = Str::upper(Str::random(6));
        $registerNumber = "B{$nextNumber}{$randomString}";
      } while (static::where('register_number', $registerNumber)->exists());

      $batch->register_number = $registerNumber;
    });
  }
}
