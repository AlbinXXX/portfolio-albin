<?php

use App\Http\Controllers\Api\ABTestController;
use Illuminate\Support\Facades\Route;

Route::prefix('ab-tests')->group(function () {
    Route::get('/', [ABTestController::class, 'index']);
    Route::get('/{testId}', [ABTestController::class, 'show']);
    Route::get('/{testId}/metrics', [ABTestController::class, 'metrics']);
    Route::post('/track', [ABTestController::class, 'track']);
});

Route::post('ab-test-events', [ABTestController::class, 'track']);