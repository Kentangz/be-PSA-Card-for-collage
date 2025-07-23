<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = ["status", "card_id"];

    public function Card()
    {
        return $this->belongsTo(Card::class);
    }
}
