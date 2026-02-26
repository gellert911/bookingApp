<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
    use HasFactory, Auditable;

    protected $fillable = [
        "user_id",
        "email",
        "type",
        "token",
        "expires_at",
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
