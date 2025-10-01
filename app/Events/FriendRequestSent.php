<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class FriendRequestSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender;

    public $receiver;

    public function __construct(User $sender, User $receiver)
    {
        $this->sender = $sender;
        $this->receiver = $receiver;
        // Log::info("FriendRequestSent event constructed", [
        //     'sender_id' => $sender->id,
        //     'receiver_id' => $receiver->id,
        // ]);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        // Log::info("Broadcasting on channel: friend-requests.{$this->receiver->id}");
        return new PrivateChannel('friend-requests.'.$this->receiver->id);

    }

    public function broadcastAs()
    {
        return 'FriendRequestSent';
    }

    public function broadcastWith()
    {
        $payload = [
            'sender' => [
                'id' => $this->sender->id,
                'name' => $this->sender->name,
                'username' => $this->sender->username,
                'profile_pic' => $this->sender->profile_pic ?? 'https://example.com/default-pic.jpg',
            ],
        ];
        Log::info("FriendRequestSent payload:", $payload);
        return $payload;
    }
}
