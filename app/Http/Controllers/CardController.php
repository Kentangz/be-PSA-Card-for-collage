<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index()
    {
        return Card::all();
    }

    public function getCardByUser(Request $request)
    {
        return response()->json(Card::query()->where("user_id", $request->user()->id)->with(["latestStatus"])->get());
    }

    public function show($id)
    {
        return Card::query()->where("id", $id)->get();
    }

    public function getDetailCardByUser(Request $request, $id)
    {
        return Card::query()->where("id", $id)->where("user_id", $request->user()->id)->with(["latestStatus", "statuses", "images"])->firstOrFail();
    }

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

        $card->statuses()->create(["status" => "submitted"]);

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
