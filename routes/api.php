<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\BatchPaymentController;
use App\Http\Controllers\CardDeliveryProofController;
use App\Http\Controllers\BatchController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// auth routes
Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);
Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

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
    Route::get("/cards/export", [CardController::class, "export"]);

    // Batch routes
    Route::get("/batches", [BatchController::class, "index"]);
    Route::post("/batches", [BatchController::class, "store"]);
    Route::get("/batches/{id}", [BatchController::class, "show"]);
    Route::put("/batches/{id}", [BatchController::class, "update"]);
    Route::get("/active-batches", [BatchController::class, "getActiveBatches"]);
    Route::get("/batches/{id}/user-queue", [BatchController::class, "getUserQueue"]);
    Route::put("/batches/{id}/user-queue", [BatchController::class, "updateUserQueue"]);

    // Batch Payment routes
    Route::post("/batch-payments", [BatchPaymentController::class, "store"]);
    Route::get("/batch-payments/batch/{batchId}", [BatchPaymentController::class, "getByBatch"]);
    Route::get("/batch-payments/{id}", [BatchPaymentController::class, "show"]);
    Route::put("/batch-payments/{id}/send", [BatchPaymentController::class, "sendPaymentLink"]);
    Route::delete("/batch-payments/{id}", [BatchPaymentController::class, "destroy"]);
    Route::get("/batch-payments-pending", [BatchPaymentController::class, "getPendingPayments"]);

    // Status routes
    Route::post("/status", [StatusController::class, "store"]);

    // Delivery proof routes
    Route::post('/card/{id}/delivery-proof', [CardDeliveryProofController::class, 'store']);
    Route::get('/card/{id}/delivery-proof', [CardDeliveryProofController::class, 'show']);
    Route::delete('/card/{cardId}/delivery-proof/{proofId}', [CardDeliveryProofController::class, 'destroy']);
});
