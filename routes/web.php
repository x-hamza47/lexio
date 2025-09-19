<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::controller(AuthController::class)->group(function(){
    Route::get('/register-page', 'registerPage')->name('register.show'); 
    Route::post('/register', 'register')->name('register.store'); 
    Route::get('/', 'loginPage')->name('login'); 
    Route::post('/login', 'login')->name('user.login'); 
    Route::get('/check-username', 'checkUsername')->name('check.username')->middleware('throttle:15,1');
    Route::get('/logout', 'logout')->name('user.logout');
});
Route::get('/chit-chat', function(){
    return inertia('Main');
})->name('chit.chat')->middleware('auth');

