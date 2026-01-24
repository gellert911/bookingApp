<?php

namespace App\Http\Controllers\Auth;

use App\Services\EmailVerificationService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    private $service;

    public function __construct(EmailVerificationService $service)
    {
        $this->service = $service;
    }

    public function verify(Request $request, $token) {
        $user = $this->service->verify($token);

        if ($user) {
            return response()->json(["success" => true, "message" => "Email verified successfully!"]);
        }
        return response()->json(["success" => false, "message" => "Invalid or expired token."]);
    }

    public function resend(Request $request) {
        $user = $request->user();

        $this->service->send($user);

        return response()->json(["success" => true, "message" => "Verification email sent!"]);
    }
}
