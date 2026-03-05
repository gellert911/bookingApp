<?php

namespace App\Services;

use App\Events\PasswordResetRequested;
use App\Mail\PasswordReset;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Auth\Events\PasswordReset as EventsPasswordReset;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PasswordResetService {
    public function send(User $user) {
        $token = Str::random(32);

        $userToken = UserToken::create([
            "user_id" => $user->id,
            "email" => $user->email,
            "type" => "password_reset",
            "token" => $token,
            "expires_at" => now()->addHours(1),
        ]);

        Mail::to($user->email)->send(new PasswordReset($user, $userToken));
        event(new PasswordResetRequested($user));
    }

    public function reset($token, $newPassword) {

        $userToken = UserToken::where("token", $token)
            ->where("type", "password_reset")
            ->where("expires_at", ">", now())
            ->first();

        if (!$userToken) return null;

        $user = $userToken->user;
        $user->password = Hash::make($newPassword);
        $user->save();

        $userToken->delete();

        event(new EventsPasswordReset($user));

        return $user;
    }
}

?>