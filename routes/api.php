<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/companies/{company}/set-logo', [CompanyController::class, 'setLogo']);
    Route::get('/companies/archive', [CompanyController::class, 'getArchived']);
    Route::apiResource('companies', CompanyController::class);
});

//Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
