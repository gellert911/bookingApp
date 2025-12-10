<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller {
    public function show($id) {
        $user = User::find($id);

        if ($user) {
            
            if (request()->expectsJson()) {
                return response()->json(["success" => true, "message" => $user]);
            }

            return view('profile', compact('user'));
        }
    }

    public function partialUpdate(Request $request, $id) {
        // validation
        
        $user = User::find($id);

        $allowedFields = ["password", "full_name", "phone_country", "phone_number"];

        $values = $request->only($allowedFields);

        if ($user) {

            if (isset($values["password"])) {
                $values["password"] = Hash::make($values["password"]);
            }

            try {
                $user->update($values);
            } catch (Exception $e) {
                Log::error("ProfileController error: " . $e->getMessage());
                return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
            }
            return response()->json(["success" => true, "message" => __("user.update_successful")]);
        }
        return response()->json(["success" => false, "message" => __("user.not_exists")]);
    }

    public function update(Request $request, $id) {

        $validator = Validator::make($request->all(), [
            "full_name" => "string",
            "phone_country" => "max:4",
            "phone_number" => "numeric|regex:/^[0-9]{1,11}$/",
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => __("user.validation_fail")]);
        }

        $user = User::find($id);
        $value = $request->input();

        if ($user) {
            try {
              $user->update([
                "full_name" => $value["full_name"],
                "phone_country" => $value["phone_country"],
                "phone_number" => $value["phone_number"]
              ]);
            } catch (Exception $e) {
                Log::error("ProfileController error: " . $e->getMessage());
                return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
            }
            return response()->json(["success" => true, "message" => __("user.update_successful")]);
        }
        return response()->json(["success" => false, "message" => __("user.not_exists")]);
    }

    public function delete(Request $request, $id) {
        $user = User::find($id);

        if ($user) {
            try {
                $user->delete();
            } catch (Exception $e) {
                Log::error("User controller: " . $e->getMessage());
                return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
            }
            return response()->json(["success" => true, "message" => "Goodbye"]);
        }
    }
}
?>