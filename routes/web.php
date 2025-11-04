<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\ABTestController as AdminABTestController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Homepage');
})->name('home');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{post:slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::get('/projects/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('/page-builder', function () {
    return Inertia::render('PageBuilderDemo');
})->name('page-builder-demo');

Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/preview/page/{page}', [\App\Http\Controllers\PageViewController::class, 'preview'])
    ->middleware('auth')
    ->name('page.preview');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        
        // Custom post routes to use ID instead of slug
        Route::get('posts', [PostController::class, 'index'])->name('posts.index');
        Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
        Route::post('posts', [PostController::class, 'store'])->name('posts.store');
        Route::get('posts/{id}', [PostController::class, 'show'])->name('posts.show')->where('id', '[0-9]+');
        Route::get('posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit')->where('id', '[0-9]+');
        Route::put('posts/{id}', [PostController::class, 'update'])->name('posts.update')->where('id', '[0-9]+');
        Route::delete('posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy')->where('id', '[0-9]+');
        
        Route::resource('projects', AdminProjectController::class);
        Route::resource('ab-tests', AdminABTestController::class);
        Route::resource('pages', \App\Http\Controllers\Admin\PageController::class);
        
        Route::post('pages/api/save', [\App\Http\Controllers\Admin\PageController::class, 'apiSave'])->name('pages.api.save');
        Route::get('pages/{page}/api/load', [\App\Http\Controllers\Admin\PageController::class, 'apiLoad'])->name('pages.api.load');
        Route::post('pages/{page}/duplicate', [\App\Http\Controllers\Admin\PageController::class, 'duplicate'])->name('pages.duplicate');
    });
});

require __DIR__.'/settings.php';

Route::get('/{slug}', [\App\Http\Controllers\PageViewController::class, 'show'])
    ->where('slug', '[a-zA-Z0-9\-_]+')
    ->name('page.show');
