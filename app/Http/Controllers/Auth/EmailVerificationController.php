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

    public function verify(Request $request) {
        $request->validate([
            "token" => "required",
        ]);

        $user = $this->service->verify($request->token);

        if ($user) {
            return response()->json(["success" => true, "message" => __("auth.email_verification_success")]);
        }
        return response()->json(["success" => false, "message" => __("auth.invalid_token")]);
    }

    public function resend(Request $request) {
        $user = $request->user();

        $this->service->send($user);

        return response()->json(["success" => true, "message" =>  __("auth.email_verification_sent")]);
    }
}
