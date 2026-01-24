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

        $validator = Validator::make($request->all(), [
            "email" => "required",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => $request['password']]);
        }

        $userFound = User::where("email", $request["email"])->first();

        if (!$userFound) {
            return response()->json(["success" => false, "message" => __("auth.user_not_exists")]);
        }

        try {
            $login = Auth::attempt(['email' => $request["email"], "password" => $request["password"]]);

            if ($login) {
                session()->regenerate();
                return response()->json(["success" => true, "message" => "siker", "user" => auth()->user()]);
            }

            return response()->json(["success" => false, "message" => __("auth.password")]);
        } catch (Exception $e) {
            Log::error("Login error: " . $e->getMessage());
            return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
        }
    }
}


?>