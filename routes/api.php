<?php

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*======Public routes======*/

//Register user
Route::post('/register', [UserController::class, 'register']);
//Register user
Route::post('/login', [UserController::class, 'login']);

//get all Posts
Route::get('/posts', [PostController::class, 'getPost']);
//get Post by ID
Route::get('/posts/{id}', [PostController::class, 'getPostById']);



/*======Protected routes======*/

Route::group(['middleware' => ['auth:sanctum']], function () {

    //Logout
    Route::post('/logout', [UserController::class, 'logout']);

    //Get post per user
    Route::get('/posts/user/{id}', [PostController::class, 'getPostByUser']);
    //add new Post
    Route::post('/posts', [PostController::class, 'addPost']);
    //Update post
    Route::put('/posts/{id}', [PostController::class, 'updatePost']);
    //Delete post
    Route::delete('/posts/{id}', [PostController::class, 'deletePost']);
    
});
