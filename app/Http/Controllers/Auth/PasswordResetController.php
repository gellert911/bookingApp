<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\PasswordResetService;
use App\Models\User;

class PasswordResetController extends Controller
{
    //
    private PasswordResetService $service;

    public function __construct(PasswordResetService $service)
    {
        $this->service = $service;
    }

    public function send(Request $request) {
        $request->validate([
            "email" => "required|email",
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(["success" => false, "message" => __("auth.user_not_exists")]);
        }

        $this->service->send($user);

        return response()->json(["success" => true, "message" => __("auth.password_reset_sent")]);
    }

    public function reset(Request $request) {
        $request->validate([
            "token" => "required",
            "newPassword" => "required",
        ]);

        $user = $this->service->reset($request->token, $request->newPassword);

        if (!$user) {
            return response()->json(["success" => false, "message" => __("auth.invalid_token")]);
        }
        return response()->json(["success" => true, "message" => __("auth.password_reset_success")]);
    }
}
