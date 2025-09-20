<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;

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

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'profile_pic' => $profilePic,
        ]);

        return redirect()->route('login');
    }

    public function login(Request $request)
    {
        sleep(1);

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
        sleep(2);
        return inertia('Auth/AuthLayout');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
