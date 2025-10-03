<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $friendIds = $user->friends()->pluck('id');

        $chats = Message::where(function ($query) use ($user, $friendIds) {
            $query->whereIn('sender_id', $friendIds)->where('receiver_id', $user->id)
                ->orWhereIn('receiver_id', $friendIds)->where('sender_id', $user->id);
        })
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function ($message) use ($user) {
                return $message->sender_id === $user->id ? $message->receiver_id : $message->sender_id;
            })
            ->map(function ($messages, $friendId) {
                $friend = $messages->first()->sender_id == $friendId
                    ? $messages->first()->sender
                    : $messages->first()->receiver;

                return [
                    'friend' => [
                        'id' => $friend->id,
                        'name' => $friend->name,
                        'profile' => $friend->profile_pic ?? null,
                    ],
                    'last_message' => $messages->first()->message,
                    'timestamp' => $messages->first()->created_at,
                ];
            })
            ->values();

        return response()->json(['chats' => $chats]);
    }
}
