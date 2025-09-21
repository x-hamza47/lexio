<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\EmailOtp;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;

class OtpController extends Controller
{
    public function verfiyOtp(Request $request)
    {
        $request->validate([
            'otp_code' => 'required|digits:6',
        ]);

        $userId = session('otp_user');
        $otpInput = $request->otp_code;

        if (!$userId) {
            return response()->json(['success' => false, 'message' => 'User session expired']);
        }
        // Sesssion Check
        if (session('otp_user') == $userId && session('otp_code') == $otpInput) {

            if (now()->lessThan(session('otp_expires_at'))) {

                session()->forget(['otp_user', 'otp_code', 'otp_expires_at']);
                
                User::where('id', $userId)->update(['email_verified' => true]);

                EmailOtp::where('user_id', $userId)
                    ->where('otp_code', $otpInput)
                    ->delete();

                return response()->json(['success' => true, 'message' => 'OTP verified successfully']);
            } else {
                return response()->json(['success' => false, 'message' => 'OTP expired']);
            }
        }

        // Database Check
         $otpRecord = EmailOtp::where('user_id', $userId)
            ->where('expires_at', '>', now())
            ->first();

        if ($otpRecord) {
            try {
                $decryptedOtp = Crypt::decryptString($otpRecord->otp_code);
            } catch (\Exception $e) {
                return response()->json(['success' => false, 'message' => 'Invalid OTP']);
            }

            if ($decryptedOtp == $otpInput) {
                $otpRecord->delete();
                User::where('id', $userId)->update(['email_verified' => true]);
                session()->forget(['otp_user', 'otp_code', 'otp_expires_at']);

                return response()->json(['success' => true, 'message' => 'OTP verified successfully']);
            }
        }

        return response()->json(['success' => false, 'message' => 'Invalid OTP']);
    }
}
