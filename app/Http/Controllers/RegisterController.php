<?php

namespace App\Http\Controllers;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller {
    
    public function register (Request $request) {

        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:255",
            "email" => "required|string",
            "password" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => __("auth.validation_fail")]);
        }

        $repo = new UserRepository();
        $name_exists = $repo->findBy("name", $request["name"]);
        $email_exists = $repo->findBy("email", $request["email"]);


        if ($name_exists || $email_exists) {
            return response()->json(["success" => false, "message" => __("auth.user_exists")]);
        }

        try {
             $user = $repo->create([
                "name" => $request["name"],
                "email" => $request["email"],
                "password" => Hash::make($request["password"]),
            ]);

            if ($user) {
                return response()->json([
                    "success" => true,
                    "message" => __("auth.register_success"),
                ], 201);
            }
        } catch (Exception $e) {
            Log::error("Register error: " . $e->getMessage());
            return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
        }
    }
}


?>