<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function registerPage(){
        sleep(10);
        return inertia('Auth/SignUp');
    }

    public function register(RegisterRequest $request){
        sleep(1);
        return inertia('Main');
    }


    public function checkUsername(Request $request){
        $username = trim($request->query('username', ''));

        if ($username === '') {
            return response()->json(['available' => null]);
        }

        if (!preg_match('/^[A-Za-z0-9_.-]+$/', $username)) {
            return response()->json([
                'available' => false,
                'reason' => 'invalid_format'
            ]);
        }

        $exists = User::where('username', $username)->exists();

        return response()->json(['available' => !$exists]);

    }
    public function loginPage(){
        sleep(10);
        return inertia('Auth/Login');
    }
}

