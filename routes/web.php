<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::controller(AuthController::class)->group(function(){
    Route::get('/register-page', 'registerPage')->name('register.show'); 
    Route::post('/register', 'register')->name('register.store'); 
    Route::get('/', 'loginPage')->name('login'); 
    Route::get('/check-username', 'checkUsername')->name('check.username')->middleware('throttle:15,1');
});

