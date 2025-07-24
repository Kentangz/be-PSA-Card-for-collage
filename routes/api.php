<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);
Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware("auth:sanctum")->group(function () {
    Route::get("/user", [AuthController::class, "getCurrentUser"]);
    Route::get("/users", [UserController::class, "index"]);
    Route::put("/users/toggle/{id}", [UserController::class, "toggleAccount"]);
    Route::get("/users/{id}", [UserController::class, "show"]);
    Route::put("/users/{id}", [UserController::class, "update"]);
    Route::post("/logout", [AuthController::class, "logout"]);

    Route::post("/card", [CardController::class, "store"]);
    Route::get("/card", [CardController::class, "index"]);
    Route::put("/card/{id}", [CardController::class, "update"]);
    Route::get("/user-cards", [CardController::class, "getCardByUser"]);
    Route::get("/card/{id}", [CardController::class, "show"]);
    Route::get("/user-cards/{id}", [CardController::class, "getDetailCardByUser"]);

    Route::post("/status", [StatusController::class, "store"]);
});
