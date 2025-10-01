<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender;
    public $receiver;
    public $message;

    public function __construct(User $sender, User $receiver, string $message)
    {
        $this->sender = $sender;
        $this->receiver = $receiver;
        $this->message = $message;

        Log::info("MessageSent event constructed", [
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'message' => $message,
        ]);
    }

    public function broadcastOn()
    {
        return new PrivateChannel('messages.' . $this->receiver->id);
    }


    public function broadcastAs(): string
    {
        return 'MessageSent';
    }

    public function broadcastWith(): array
    {
        return [
            'sender_id' => $this->sender->id,
            'sender_name' => $this->sender->name,
            'message' => $this->message,
        ];
    }
}