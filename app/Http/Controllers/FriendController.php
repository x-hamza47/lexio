<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendController extends Controller
{
    public function getFriends(){
        $user = Auth::user();

        $friendsOfMine = $user->friendsOfMine()->with('friend')->get()->pluck('friend');
        $friendsOf= $user->friendsOf()->with('user')->get()->pluck('user');

        $friends = $friendsOfMine->merge($friendsOf)->unique('id')->values();
        
        return response()->json([
            'status' => 'success',
            'friends' => $friends
        ]);
    }
}
