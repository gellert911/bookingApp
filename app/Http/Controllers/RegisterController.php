<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller {
    public function register (Request $request) {

        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:255",
            "email" => "required|string",
            "password" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => __("auth.validation_fail")]);
        }

        $repo = new UserRepository();
        $exists = $repo->findBy("name", $request["name"]);


        if ($exists) {
            return response()->json(["message" => __("auth.user_exists")]);
        }

        $user = $repo->create([
            "name" => $request["name"],
            "email" => $request["email"],
            "password" => Hash::make($request["password"]),
        ]);

        if ($user) {
            return response()->json([
                "message" => __("auth.register_success"),
            ], 201);
        }

        return response()->json([
            "message" => __("auth.unknown_error"),
        ], 444);

    }
}


?>