<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StructuralController;

Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('login', [AuthController::class, 'login'])->name('login.post');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::resource('structural', StructuralController::class)->middleware('hasModule:structural');
    
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::resource('profile', ProfileController::class);
    Route::post('profile-updatePin', [ProfileController::class, 'updatePin'])->name('profile.updatePin');
    Route::post('profile-updateActivity', [ProfileController::class, 'updateActivity'])->name('profile.updateActivity');
    Route::post('profile-unlock', [ProfileController::class, 'unlock'])->name('profile.unlock');
});

require __DIR__.'/rbac.php';
