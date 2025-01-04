<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    //    admin routes
    Route::prefix('admin')->group(function () {
        //    company routes
        Route::post('/companies/{company}/set-logo', [CompanyController::class, 'setLogo']);
        Route::apiResource('companies', CompanyController::class);

        //    product routes
        Route::apiResource('products', ProductController::class);
    });
});

//Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
