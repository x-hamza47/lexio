<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Mail\ResetPasswordMail;
use App\Mail\SendOtpMail;
use App\Models\EmailOtp;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function registerPage()
    {
        return inertia('Auth/AuthLayout', ['mode' => 'signup']);
    }

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

        $this->sendOtp($user);

        return inertia('Auth/AuthLayout', [
            'mode' => 'otp',
            'email' => $request->email,
        ]);
    }

    public function resendOtp()
    {
        $userId = session('otp_user');

        if (! $userId) {
            return response()->json([
                'success' => false,
                'message' => 'No user found for OTP.',
            ]);
        }

        $user = User::find($userId);
        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ]);
        }

        $this->sendOtp($user);

        return response()->json([
            'success' => true,
            'message' => 'OTP resent successfully.',
        ]);
    }

    private function sendOtp(User $user)
    {
        $record = EmailOtp::where('user_id', $user->id)->latest()->first();

        if ($record && $record->updated_at->diffInSeconds(now()) < 120) {
            throw new \Exception('Please wait before requesting another OTP.');
        }

        $otp = rand(100000, 999999);
        $encryptedOtp = Crypt::encryptString($otp);
        $otp_expires_at = Carbon::now()->addMinutes(2);

        session([
            'otp_code' => $otp,
            'otp_user' => $user->id,
            'otp_expires_at' => $otp_expires_at,
        ]);

        EmailOtp::updateOrCreate(
            ['user_id' => $user->id],
            ['otp_code' => $encryptedOtp, 'expires_at' => $otp_expires_at]
        );

        Mail::to($user->email)->queue(new SendOtpMail($otp));
    }

    // ! Login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'regex:/^[A-Za-z0-9_.-]+$/'],
            'password' => ['required', 'min:3', 'max:14'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            if (! $user->email_verified) {
                Auth::logout();
                $this->sendOtp($user);

                return Inertia::render('Auth/AuthLayout', [
                    'mode' => 'otp',
                    'email' => $user->email,
                ]);
            }

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

    // ! Show Login Page
    public function loginPage()
    {

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

    // ! Forgot password
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $token = Str::random(64);

        DB::table('password_resets')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => now()]
        );

        $resetLink = url("/reset-password/{$token}?email={$request->email}");

        Mail::to($request->email)->queue(new ResetPasswordMail($resetLink));

        return redirect()->route('login')->with('success', 'We have emailed your password reset link!');
    }

    // ! Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $record = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (! $record) {
            return back()->withErrors(['email' => 'Invalid or expired token.']);
        }

        User::where('email', $request->email)->update([
            'password' => Hash::make($request->password),
        ]);

        DB::table('password_resets')->where('email', $request->email)->delete();

        return redirect()->route('login')->with('success', 'Your password has been reset successfully!');
    }
}
