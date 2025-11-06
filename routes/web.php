<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\ProfileController;

Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('login', [AuthController::class, 'login'])->name('login.post');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');
Route::get('forgot-password', [AuthController::class, 'showForgotPassword'])->name('forgot.password');

Route::middleware(['auth'])->group(function () {  
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::resource('profile', ProfileController::class);
    Route::post('profile-updatePin', [ProfileController::class, 'updatePin'])->name('profile.updatePin');
    Route::post('profile-updatePassword', [ProfileController::class, 'updatePassword'])->name('profile.updatePassword');
    Route::post('profile-updateLockScreen', [ProfileController::class, 'updateLockScreen'])->name('profile.updateLockScreen');
    Route::post('profile-updateActivity', [ProfileController::class, 'updateActivity'])->name('profile.updateActivity');
    Route::post('profile-unlock', [ProfileController::class, 'unlock'])->name('profile.unlock');

    // Todo Routes with Scoped Bindings
    Route::scopeBindings()->group(function () {
        Route::post('dashboard/todos', [TodoController::class, 'store'])->name('todos.store');
        Route::put('dashboard/todos/{id}', [TodoController::class, 'update'])->name('todos.update');
        Route::delete('dashboard/todos/{id}', [TodoController::class, 'destroy'])->name('todos.destroy');
    });
});

require __DIR__.'/rbac.php';
