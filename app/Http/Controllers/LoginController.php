<?php

namespace App\Http\Controllers;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller {

    public function login (Request $request) {

        $validator = Validator::make($request->all(), [
            "name_or_email" => "required",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => __("auth.validation_fail")]);
        }

        $repo = new UserRepository;

        if (str_contains($request["name_or_email"], "@")) {
            $user_found = $repo->findBy("email", $request["name_or_email"]);
            $auth_key = "email";
        } else {
            $user_found = $repo->findBy("name", $request["name_or_email"]);
            $auth_key = "name";
        }

        if (!$user_found) {
            return response()->json(["success" => false, "message" => __("auth.user_not_exists")]);
        }

        try {
            $login = Auth::attempt([$auth_key => $request["name_or_email"], "password" => $request["password"]]);

            if ($login) {
                session()->regenerate();
                return response()->json(["success" => true, "message" => "siker", "redirect_url" => "/dashboard"]);
            }

            return response()->json(["success" => false, "message" => __("auth.password")]);
        } catch (Exception $e) {
            Log::error("Login error: " . $e->getMessage());
            return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
        }
    }
}


?>