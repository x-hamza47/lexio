<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleAuthentication()
    {
        try {

            $googleUser = Socialite::driver('google')->user();

            $user = User::where('google_id', $googleUser->getId())->first();

            if (! $user) {
                $user = User::where('email', $googleUser->getEmail())->first();

                if ($user) {
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'profile_pic' => $googleUser->getAvatar(),
                    ]);
                }
            }
            if (! $user) {
                $user = User::create([
                    'google_id' => $googleUser->id,
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'username' => $this->generateUniqueUsername($googleUser->getName()),
                    'password' => bcrypt(Str::random(16)),
                    'profile_pic' => $googleUser->getAvatar(),
                ]);
            }
            Auth::login($user);

            return redirect()->route('chit.chat');
        } catch (Exception $e) {
            abort(500, 'Something went wrong with Google Login.');
        }
    }

    private function generateUniqueUsername($name)
    {
        $base = Str::slug($name);
        $username = $base;
        $counter = 1;

        while (User::where('username', $username)->exists()) {
            $username = $base.'_'.rand(100, 999);
            $counter++;
            if ($counter > 10) {
                break;
            }
        }

        return $username;
    }
}
