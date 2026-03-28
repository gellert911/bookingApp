<?php

namespace App\Services;

use App\Models\User;
use App\Services\EmailVerificationService;
use Illuminate\Support\Facades\Hash;


class RegistrationService {
    private EmailVerificationService $emailVerification;

    public function __construct(EmailVerificationService $emailVerification)
    {
        $this->emailVerification = $emailVerification;
    }

    public function register ($data) {
        $user = User::create([
            "email" => $data["email"],
            "password" => Hash::make($data["password"]),
        ]);

        $this->emailVerification->send($user);
        
        return $user;
    }
}

?>