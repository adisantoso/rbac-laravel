<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Example API route
Route::get('/ping', function () {
    return response()->json(['message' => 'Hello, API Webservices is up!']);
});

// Authentication routes
Route::post('login', [App\Http\Controllers\Api\AuthController::class, 'login'])->name('api.login');
Route::post('reset-password', [App\Http\Controllers\Api\AuthController::class, 'resetPassword'])->name('api.reset.password');

// Protected routes
Route::middleware('auth:sanctum')->group(function () { 
    
    Route::get('/profile', [App\Http\Controllers\Api\ProfileController::class, 'show'])->name('api.profile.show');
    Route::post('/profile/update', [App\Http\Controllers\Api\ProfileController::class, 'update'])->name('api.profile.update');
    Route::post('/profile/updatePassword', [App\Http\Controllers\Api\ProfileController::class, 'updatePassword'])->name('api.profile.updatePassword');
    
    Route::post('logout', [App\Http\Controllers\Api\AuthController::class, 'logout'])->name('api.logout')->middleware('throttle:5,1');
    // Additional protected routes can be added here
});