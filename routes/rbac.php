<?php

use App\Http\Controllers\RBAC\MenuModulController;
use App\Http\Controllers\RBAC\ModuleController;
use App\Http\Controllers\RBAC\RoleController;
use App\Http\Controllers\RBAC\UserController;
use App\Http\Controllers\RBAC\UserRoleController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth','role:Admin')->group(function () {
    //Modul
    Route::resource('module', ModuleController::class);
    //Menu
    Route::resource('menu-module', MenuModulController::class);
    //Role
    Route::resource('role', RoleController::class);
    //UserRole
    Route::resource('user-role', UserRoleController::class);
    // Tambahan untuk add module access
    Route::post('/role/{role}/modules', [RoleController::class, 'addModule'])->name('roles.addModule');
    //User
    Route::resource('user', UserController::class);

});
