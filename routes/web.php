<?php

use Illuminate\Http\Request;
use App\Http\Middleware\ValidUser;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\GoogleController;

Route::controller(AuthController::class)->group(function () {
    Route::get('/register', 'registerPage')->name('register.show');
    Route::post('/register', 'register')->name('signup');
    Route::get('/login', 'loginPage')->name('login');
    Route::get('/', 'loginPage');
    Route::post('/login', 'login')->name('user.login');
    Route::get('/pass-recover', 'passRecover')->name('pass.recover');
    Route::get('/check-username', 'checkUsername')->name('check.username')->middleware('throttle:15,1');
    Route::post('/logout', 'logout')->name('user.logout');
    Route::post('/resend-otp',  'resendOtp')->name('resend.otp');
    Route::post('/forgot-password',  'forgotPassword')->name('password.email');

});

Route::get('/reset-password/{token}', function ($token, Request $request) {
    return inertia('Auth/ResetPassword', [
        'token' => $token,
        'email' => $request->query('email'),
    ]);
})->name('password.reset');

Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');

Route::post('/verify-otp', [OtpController::class, 'verfiyOtp'])->name('otp.verify');
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleController::class, 'googleAuthentication'])->name('auth.google.callback');

Route::get('/chit-chat', function () {
    return inertia('Main');
})->name('chit.chat')->middleware(ValidUser::class);
Route::get('/add-friends-data', [UserController::class, 'addFriendPage'])->name('users.index')->middleware(ValidUser::class);


// ! FRIENDS ROUTEs
