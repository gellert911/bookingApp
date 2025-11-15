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

    public function partialUpdate(Request $request, $id, $field) {
        // validation
        
        $user = User::find($id);
        $value = $request->input($field);

        if ($user) {

            if ($field == "password") {
                $value = Hash::make($value);
            }

            try {
                $user->update([
                    $field => $value,
                ]);
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
            "fullName" => "string",
            "phoneCountry" => "max:4",
            "phoneNumber" => "numeric|regex:/^[0-9]{1,11}$/",
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => __("user.validation_fail")]);
        }

        $user = User::find($id);
        $value = $request->input();

        if ($user) {
            try {
              $user->update([
                "full_name" => $value["fullName"],
                "phone_country" => $value["phoneCountry"],
                "phone_number" => $value["phoneNumber"]
              ]);
            } catch (Exception $e) {
                Log::error("ProfileController error: " . $e->getMessage());
                return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
            }
            return response()->json(["success" => true, "message" => __("user.update_successful")]);
        }
        return response()->json(["success" => false, "message" => __("user.not_exists")]);
    }
}
?>