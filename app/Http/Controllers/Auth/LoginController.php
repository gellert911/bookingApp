<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller {

    public function login (Request $request) {

        $request->validate([
            "email" => "required",
            "password" => "required",
        ]);

        $user = User::where("email", $request["email"])->first();

        if (!$user) {
            return response()->json(["success" => false, "message" => __("auth.user_not_exists")]);
        }

        try {
            $login = Auth::attempt(['email' => $request["email"], "password" => $request["password"]]);

            if ($login) {
                $request->session()->regenerate();

                return response()->json([
                    "success" => true, 
                    "message" => "Login successful!",  
                    "user" => $user
                ]);
            }

            return response()->json(["success" => false, "message" => __("auth.password")]);
        } catch (Exception $e) {
            Log::error("Login error: " . $e->getMessage());
            return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
        }
    }
}


?>