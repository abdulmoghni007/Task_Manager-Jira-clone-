<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\PriorityController;
use App\Http\Controllers\Task_StatusController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\NavigationMenuController;

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

////Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
////    return $request->user();
//
//
//});

Route::POST('/register',[UserController::class , 'userRegistration']);
Route::POST('/login',[UserController::class,'login']);
Route::POST('/getUser',[UserController::class,'getUser'])->middleware('auth:sanctum');
Route::POST('/logout',[UserController::class,'logout'])->middleware('auth:sanctum');
Route::POST('/getIssue',[IssueController::class,'getIssue'])->middleware('auth:sanctum');
Route::POST('/getPriority',[PriorityController::class ,'getPriority'])->middleware('auth:sanctum');
Route::POST('/getTaskStatus',[Task_StatusController::class ,'getTaskStatus'])->middleware('auth:sanctum');
Route::POST('/createTask',[TaskController::class,'createTask'])->middleware('auth:sanctum');
Route::POST('/getTask',[TaskController::class,'getTask'])->middleware('auth:sanctum');
Route::POST('/updateTask',[TaskController::class,'updateTask'])->middleware('auth:sanctum');
Route::POST('/getAllUser',[UserController::class,'getAllUser'])->middleware('auth:sanctum');
Route::POST('/getTaskDetail',[TaskController::class,'getTaskDetail'])->middleware('auth:sanctum');
Route::POST('/getMenuItems',[NavigationMenuController::class,'getMenuItems'])->middleware('auth:sanctum');
