<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "year" => "required|integer",
            "brand" => "required|string",
            "serial_number" => "required|string",
            "grade_target" => "required|string",
        ]);

        $validated["user_id"] = $request->user()->id;
        $card = Card::query()->create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('card-images', 'public');

                $card->images()->create([
                    'path' => $path
                ]);
            }
        }

        return response()->json(["card" => $card]);
    }
}
