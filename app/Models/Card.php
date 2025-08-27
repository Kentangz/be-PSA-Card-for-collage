<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Card extends Model
{
    use HasUuids;

    protected $fillable = [
        "name",
        "year",
        "brand",
        "serial_number",
        "grade_target",
        "user_id",
        "batch_id",
        "grade",
        "payment_url"
    ];

    public function newUniqueId(): string
    {
        return (string) Uuid::uuid7();
    }

    public function uniqueIds(): array
    {
        return ['id'];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function batch(){
        return $this->belongsTo(Batch::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function statuses()
    {
        return $this->hasMany(Status::class);
    }

    public function latestStatus()
    {
        return $this->hasOne(Status::class)->latestOfMany();
    }

    public function deliveryProofs()
    {
        return $this->hasMany(CardDeliveryProof::class);
    }
}
