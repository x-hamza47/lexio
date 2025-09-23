<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function addFriendPage()
    {
        $user = Auth::user();

        $pendingRequests = $user->receivedFriendRequests()->with('sender:id, name, username, is_verified, is_premium, profile_pic')->get();

        $friendIds = $user->friends()->pluck('id')->toArray();

        $pendingIds = $user->sentFriendRequests()->pluck('to_user_id')->toArray();

        $excludeIds = array_merge([$user->id], $friendIds, $pendingIds);

        $suggestedUsers = User::whereNotIn('id', $excludeIds)
            ->select('id', 'name', 'username', 'is_verified', 'is_premium', 'profile_pic')
            ->where('email_verified', true)
            ->get();

        return response()->json([
            'pendingRequests' => $pendingRequests,
            'suggestedUsers' => $suggestedUsers,
        ]);
    }
}
