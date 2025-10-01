<?php


use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Broadcast;

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

// Broadcast::channel('messages.{receiverId}', function ($user, $receiverId) {
//     Log::info("Authorizing channel: messages.{$receiverId}", [
//         'user_id' => $user ? $user->id : null,
//         'receiver_id' => $receiverId,
//     ]);
//     return $user && (int) $user->id === (int) $receiverId;
// });
Broadcast::channel('messages.{receiverId}', function ($user, $receiverId) {
     return $user && (int) $user->id === (int) $receiverId;
});

Broadcast::channel('friend-requests.{receiverId}', function ($user, $receiverId) {
    Log::info("Authorizing friend-requests.{$receiverId} for user {$user->id}");
    return (int) $user->id === (int) $receiverId;
});