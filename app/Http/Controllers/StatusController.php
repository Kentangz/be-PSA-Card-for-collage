<?php

namespace App\Http\Controllers;

use App\Events\StatusCreatedEvent;
use App\Models\Status;
use App\Models\Card;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            "status" => "required|string",
            "card_id" => "required|string"
        ]);

        $result = Status::query()->create($validated);

        $card = Card::with(['user', 'images'])->find($validated['card_id']);

        if ($card && $card->user) {
            StatusCreatedEvent::dispatch($result, $card);
        }

        return response()->json(["result" => $result]);
    }
}
