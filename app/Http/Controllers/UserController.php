<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        return User::query()->where("id", $id)->firstOrFail();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            "name" => "string",
            "email" => "email",
            "phone_number" => "string",
            "role" => "string",
        ]);

        $user = User::query()->where("id", $id)->update($validated);

        if ($user) {
            return response()->json(["message" => "success updated"]);
        }
    }
}
