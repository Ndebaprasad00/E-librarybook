<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassportAuthController;
use App\Http\Controllers\BookController;

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

Route::get('logout',[PassportAuthController::class,'logout']);
Route::post('login',[PassportAuthController::class,'login']);
Route::post('register',[PassportAuthController::class,'register']);

Route::middleware('auth:api')->group(function(){
    Route::get('getuser',[PassportAuthController::class,'getuser']);
    Route::post('logout', [PassportAuthController::class,'logout']); 
    Route::post('updatepass',[PassportAuthController::class,'updatepass']);
    //product routes
    Route::get('read-book',[BookController::class,'readbook']);
    Route::get('all-books',[BookController::class,'allbooks']);
    Route::get('readbooks/{id}',[BookController::class,'singlebook']);


    Route::post('update/{id}',[BookController::class,'update']);
    Route::delete('delete/{id}',[BookController::class,'delete']);

    


    Route::post('create-book',[BookController::class,'createbook']);
    



});
