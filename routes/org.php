<?php

use App\Http\Controllers\StructuralController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth','hasModule:Organization'])->group(function () {
    Route::resource('structural', StructuralController::class);
});