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
        Route::post('/logout', 'logout')->middleware('auth:sanctum');
});

Route::prefix('community')
    ->controller(CommunityController::class)
    ->group(function() {
        Route::get('/', 'index');
        Route::get('/{community}', 'getCommunityById');
        Route::post('/', 'store')->middleware('auth:sanctum');
        Route::delete('/{community}', 'destroy')->middleware('auth:sanctum');
        Route::post('/generate/{keyword?}','generate')->middleware('auth:sanctum');
});

Route::prefix('post')
    ->controller(PostController::class)
    ->group(function() {
        Route::get('/', 'index');
        Route::get('/{post}', 'getPostById');
        Route::get('/search/{keyword?}', 'index');
        Route::post('community/{community}', 'store')->middleware('auth:sanctum');
        Route::post('community/{community}/generate/{keyword?}', 'generate')->middleware('auth:sanctum');
        Route::delete('/{post}', 'destroy')->middleware('auth:sanctum');
        Route::get('/community/{community}/{keyword?}', 'getPostFromCommunity');
        Route::get('/user/{user}/{keyword?}', 'getPostFromUser');
});

Route::prefix('comment')
    ->controller(CommentController::class)
    ->group(function() {
        Route::get('{comment}', 'getCommentById');
        Route::get('/post/{post}', 'getCommentByPostId');
        Route::post('/post/{post}', 'store')->middleware('auth:sanctum');
        Route::post('/post/{post}/generate/{keyword?}', 'generate')->middleware('auth:sanctum');
        Route::delete('/{comment}', 'destroy')->middleware('auth:sanctum');
});