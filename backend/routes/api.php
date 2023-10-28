<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')
    ->controller(AuthController::class)
    ->group(function() {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
        Route::post('/logout', 'logout');
});

Route::prefix('community')
    ->controller(CommunityController::class)
    ->middleware('auth:sanctum')
    ->group(function() {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::delete('/{community}', 'destroy');
});

Route::prefix('post')
    ->controller(PostController::class)
    ->middleware('auth:sanctum')
    ->group(function() {
        Route::get('/', 'index');
        Route::get('/{post}', 'show');
        Route::post('community/{community}', 'store');
        Route::delete('/{post}', 'destroy');
        Route::get('/community/{community}', 'getPostFromCommunity');
        Route::get('/user/{user}', 'getPostFromUser');
});

Route::prefix('comment')
    ->controller(CommentController::class)
    ->middleware('auth:sanctum')
    ->group(function() {
        Route::get('/post/{post}', 'getCommentByPostId');
        Route::post('/post/{post}', 'store');
        Route::delete('/{comment}', 'destroy');
});