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
            ->where('email_verified', true)
            ->select('id', 'name', 'username', 'is_verified', 'is_premium', 'profile_pic')
            ->orderBy('id')
            ->cursorPaginate(10);

        return response()->json([
            'pendingRequests' => $pendingRequests,
            'suggestedUsers' => $suggestedUsers,
        ]);
    }
}
