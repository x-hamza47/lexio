<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Auth/SignUp');
});


