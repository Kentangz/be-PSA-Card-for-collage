<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/reset-password/{token}', function (string $token) {
    return redirect(config('app.frontend_url') . '/reset-password?token=' . $token . '&email=' . request('email'));
})->name('password.reset');
