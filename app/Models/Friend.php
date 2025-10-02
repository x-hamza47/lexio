<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    protected $guarded = [];
    public function friend()
    {
        return $this->belongsTo(User::class, 'friend_id');
    }
}
