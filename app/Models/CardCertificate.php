<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CardCertificate extends Model
{
    protected $fillable = [
        'card_id',
        'cert_url'
    ];

    public function card()
    {
        return $this->belongsTo(Card::class);
    }
}
