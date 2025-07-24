<?php

namespace App\Http\Controllers;

use App\Models\Status;
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

        return response()->json(["result" => $result]);
    }
}
