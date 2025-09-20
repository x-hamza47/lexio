<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\EmailOtp;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        sleep(1);

        $profilePic = null;

        if ($request->hasFile('profile_pic')) {
            $file = $request->file('profile_pic');
            $extension = $file->extension();

            $filename = $request->username.'_'.time().'.'.$extension;

            $profilePic = $file->storeAs('profile_pics', $filename, 'public');
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'profile_pic' => $profilePic,
        ]);

        // $otp = rand(100000, 999999);

        // EmailOtp::create([
        //     'user_id' => $user->id,
        //     'otp_code' => $otp,
        //     'expires_at' => Carbon::now()->addMinutes(2),
        // ]);

        // Session::put('otp_code', $otp);
        // Session::put('otp_user', $user->id);

        // Mail::


        // return inertia('Auth/AuthLayout',[
        //     'mode' => 'otp'
        // ]);
        // return redirect()->route('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'regex:/^[A-Za-z0-9_.-]+$/'],
            'password' => ['required', 'min:3', 'max:14'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->route('chit.chat');
        }

        return back()->withErrors(['username' => 'The provided credentials do not match our records.']);
    }

    public function checkUsername(Request $request)
    {
        $username = trim($request->query('username', ''));

        if ($username === '') {
            return response()->json(['available' => null]);
        }

        if (! preg_match('/^[A-Za-z0-9_.-]+$/', $username)) {
            return response()->json([
                'available' => false,
                'reason' => 'invalid_format',
            ]);
        }

        $exists = User::where('username', $username)->exists();

        return response()->json(['available' => ! $exists]);
    }

    public function loginPage()
    {
        sleep(1);

        return inertia('Auth/AuthLayout', [
            'mode' => 'login',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    // public function otpVerify(){
    //     return inertia('Auth/AuthLayout',[
    //         'mode' => 'otp'
    //     ]);
    // }
    public function passRecover(){
        return inertia('Auth/AuthLayout',[
            'mode' => 'forgot_password'
        ]);
    }
}
