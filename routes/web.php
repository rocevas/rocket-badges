<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['verify.shopify'])->group( function () {

    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::get('/home2', [DashboardController::class, 'home2'])->name('home2');

});
