<?php

namespace App\Services;

use App\Mail\VerifyEmail;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class EmailVerificationService {
    public function send(User $user) {
        $token = Str::random(32);

        $userToken = UserToken::create([
            "user_id" => $user->id,
            "email" => $user->email,
            "type" => "email_verification",
            "token" => $token,
            "expires_at" => now()->addHours(24),
        ]);

        Mail::to($user->email)->send(new VerifyEmail($user, $userToken));
    }

    public function verify($token) {
        $userToken = UserToken::where("token", $token)
            ->where("type", "email_verification")
            ->where("expires_at", ">", now())
            ->first();

        if (!$userToken) return null;


        $user = $userToken->user;
        $user->email_verified_at = now();
        $user->save();

        $userToken->delete();

        event(new Verified($user));

        return $user;
    }
}

?>