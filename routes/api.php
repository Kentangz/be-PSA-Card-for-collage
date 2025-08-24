<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\CardDeliveryProofController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);
Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get("/cards/export", [CardController::class, "export"]);

// Public routes
Route::get('/public-card-search-serial', [CardController::class, 'publicSearchBySerialNumber']);
Route::get('/public-latest-cards', [CardController::class, 'publicLatestCards']);

Route::middleware("auth:sanctum")->group(function () {
    // User routes
    Route::get("/user", [AuthController::class, "getCurrentUser"]);
    Route::get("/users", [UserController::class, "index"]);
    Route::put("/users/toggle/{id}", [UserController::class, "toggleAccount"]);
    Route::get("/users/{id}", [UserController::class, "show"]);
    Route::put("/users/{id}", [UserController::class, "update"]);
    Route::post("/logout", [AuthController::class, "logout"]);

    // Card routes
    Route::post("/card", [CardController::class, "store"]);
    Route::get("/card", [CardController::class, "index"]);
    Route::put("/card/{id}", [CardController::class, "update"]);
    Route::get("/user-cards", [CardController::class, "getCardByUser"]);
    Route::get("/card/{id}", [CardController::class, "show"]);
    Route::get("/user-cards/{id}", [CardController::class, "getDetailCardByUser"]);

    // Status routes
    Route::post("/status", [StatusController::class, "store"]);

    // Delivery proof routes
    Route::post('/card/{id}/delivery-proof', [CardDeliveryProofController::class, 'store']);
    Route::get('/card/{id}/delivery-proof', [CardDeliveryProofController::class, 'show']);
    Route::delete('/card/{cardId}/delivery-proof/{proofId}', [CardDeliveryProofController::class, 'destroy']);
});
