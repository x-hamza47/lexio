<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'google_id',
        'name',
        'username',
        'email',
        'email_verified',
        'password',
        'profile_pic',
        'is_verified',
        'is_premium',
        'public_key',
        'private_key_encrypted',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_premium' => 'boolean',
            'is_verified' => 'boolean',
            'is_online' => 'boolean',

        ];
    }

    public function sentFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'from_user_id');
    }

    public function receivedFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'to_user_id');
    }

    public function friendsOfMine()
    {
        return $this->hasMany(Friend::class, 'user_id');
    }

    public function friendsOf()
    {
        return $this->hasMany(Friend::class, 'friend_id');
    }

    public function friends()
    {
        return $this->friendsOfMine->merge($this->friendsOf);
    }

    // ! Message Relations
    public function messagesSent()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function messagesReceived()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function messages()
    {
        return $this->messagesSent->merge($this->messagesReceived);
    }
}
