<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\GoogleController;

Route::controller(AuthController::class)->group(function(){
    // Route::get('/register-page', 'registerPage')->name('register.show'); 
    Route::post('/register', 'register')->name('signup'); 
    Route::get('/', 'loginPage')->name('login'); 
    Route::post('/login', 'login')->name('user.login'); 
    // Route::get('/otp-verify', 'otpVerify')->name('otp.verify'); 
    Route::get('/pass-recover', 'passRecover')->name('pass.recover'); 
    Route::get('/check-username', 'checkUsername')->name('check.username')->middleware('throttle:15,1');
    Route::post('/logout', 'logout')->name('user.logout');
});

Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleController::class, 'googleAuthentication'])->name('auth.google.callback');



Route::get('/chit-chat', function(){
    return inertia('Main');
})->name('chit.chat')->middleware('auth');

