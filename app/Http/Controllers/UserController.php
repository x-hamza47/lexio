<?php

namespace App\Http\Controllers;

use App\Events\FriendRequestSent;
use App\Models\Friend;
use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getPendingRequests()
    {
        $user = Auth::user();

        $pendingRequests = $user->receivedFriendRequests()
            ->whereHas('sender')
            ->with('sender:id,name,username,is_verified,is_premium,profile_pic')
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'sender' => $request->sender,
                ];
            });

        $pendingSentIds = $user->sentFriendRequests()->pluck('to_user_id')->all();

        return response()->json([
            'pendingRequests' => $pendingRequests,
            'pendingSentIds' => $pendingSentIds,
        ]);
    }

    public function getSuggestedUsers()
    {
        $user = Auth::user();

        $friendIds = $user->friends()->map(function ($friend) use ($user) {
            return $friend->user_id === $user->id ? $friend->friend_id : $friend->user_id;
        })->all();
        $pendingSentIds = $user->sentFriendRequests()->pluck('to_user_id')->all();
        $pendingReceivedIds = $user->receivedFriendRequests()->pluck('from_user_id')->all();

        $excludeIds = array_merge(
            [$user->id],
            $friendIds,
            $pendingSentIds,
            $pendingReceivedIds
        );

        $suggestedUsers = User::whereNotIn('id', $excludeIds)
            ->where('email_verified', true)
            ->select('id', 'name', 'username', 'is_verified', 'is_premium', 'profile_pic')
            ->orderBy('id')
            ->cursorPaginate(10);

        return response()->json([
            'suggestedUsers' => $suggestedUsers,
            'pendingSentIds' => $pendingSentIds,
            'pendingReceivedIds' => $pendingReceivedIds,
        ]);
    }

    public function sendRequest(User $receiver)
    {
        $sender = Auth::user();

        if ($sender->id === $receiver->id) {
            return response()->json(['message' => 'Cannot send friend request to yourself!'], 400);
        }

        $exists = FriendRequest::where(function ($q) use ($sender, $receiver) {
            $q->where('from_user_id', $sender->id)->where('to_user_id', $receiver->id);

        })->orWhere(function ($q) use ($sender, $receiver) {
            $q->where('from_user_id', $receiver->id)->where('to_user_id', $sender->id);
        })->exists();
        if ($exists) {
            return response()->json(['message' => 'Request already sent!'], 400);
        }

        $friendRequest = $sender->sentFriendRequests()->create([
            'to_user_id' => $receiver->id,

        ]);

        broadcast(new FriendRequestSent($sender, $receiver, $friendRequest->id))->toOthers();

        return response()->json([
            'message' => 'Friend request sent!',
            'receiver' => $receiver->id,
            'request_id' => $friendRequest->id,
        ]);
    }

    public function handleRequest(Request $request, $id)
    {
        $request->validate(['action' => 'required|in:accept,reject']);

        // return $request->all();
        $friendRequest = FriendRequest::findOrFail($id);

        if ($friendRequest->to_user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->action === 'accept') {
            Friend::create([
                'user_id' => $friendRequest->to_user_id,
                'friend_id' => $friendRequest->from_user_id,
            ]);

            $friendRequest->delete();

            return response()->json(['message' => 'Friend request accepted']);
        }

        if ($request->action === 'reject') {
            $friendRequest->delete();

            return response()->json(['message' => 'Friend request rejected']);
        }

        return response()->json(['error' => 'Invalid action'], 400);
    }
}
