<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\CarburantController;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/clients', [ClientController::class, 'index']);
Route::post('/clients', [ClientController::class, 'store']);
Route::get('/clients/{id}', [ClientController::class, 'show']);
Route::put('/clients/{id}', [ClientController::class, 'update']);
Route::delete('/clients/{id}', [ClientController::class, 'destroy']);


Route::get('/voitures', [VoitureController::class, 'index']);
Route::post('/voitures', [VoitureController::class, 'store']);
Route::get('/voitures/{id}', [VoitureController::class, 'show']);
Route::put('/voitures/{id}', [VoitureController::class, 'update']);
Route::delete('/voitures/{id}', [VoitureController::class, 'destroy']);


Route::get('/carburants', [CarburantController::class, 'index']);
Route::get('/marques', [MarqueController::class, 'index']);

// Contrat routes
Route::get('/contrats', [ContratController::class, 'index']); 
Route::post('/contrats', [ContratController::class, 'store']); 
Route::get('/contrats/{id}', [ContratController::class, 'show']);
Route::put('/contrats/{id}', [ContratController::class, 'update']); 
Route::delete('/contrats/{id}', [ContratController::class, 'destroy']);


Route::get('/factures', [FactureController::class, 'index']); 
Route::post('/factures', [FactureController::class, 'store']); 
Route::get('/factures/{id}', [FactureController::class, 'show']);
Route::put('/factures/{id}', [FactureController::class, 'update']); 
Route::delete('/factures/{id}', [FactureController::class, 'destroy']);