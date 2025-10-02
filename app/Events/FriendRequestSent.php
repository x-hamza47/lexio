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
    public $friendRequestId;
    public $receiver;

    public function __construct(User $sender, User $receiver, $friendRequestId)
    {
        $this->sender = $sender;
        $this->receiver = $receiver;
        $this->friendRequestId = $friendRequestId;
        Log::info("FriendRequestSent constructor", [
        'friendRequestId' => $friendRequestId,
        'sender_id' => $sender->id,
        'receiver_id' => $receiver->id,
    ]);

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
                'req' => $this->friendRequestId,
                'id' => $this->sender->id,
                'name' => $this->sender->name,
                'username' => $this->sender->username,
                'profile_pic' => $this->sender->profile_pic,
            ],
        ];
        Log::info("FriendRequestSent payload:", $payload);
        return $payload;
    }
}
