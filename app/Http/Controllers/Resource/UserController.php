<?php

namespace App\Http\Controllers\Resource;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Services\RegistrationService;

class UserController extends Controller {

    public function me() {
        return response()->json(auth()->user());
    }

    public function show(User $user) {
        if ($user->id != auth()->user()->id) {
            return response()->json(["success" => false], 403);
        }
        return response()->json(["success" => true, "message" => $user]);
    }

    public function store(Request $request, RegistrationService $registerService) {
        $request->validate([
            "email" => "required|email|unique:users,email",
            "password" => "required|min:8"
        ]);

        $registerService->register($request->only(["email", "password"]));

        return response()->json(["success" => true, "message" => __("auth.register_success")]);
    }

    public function partialUpdate(Request $request, User $user) {       
        $allowedFields = ["password", "full_name", "phone_country", "phone_number"];

        $values = $request->only($allowedFields);


        if (isset($values["password"])) {
            $values["password"] = Hash::make($values["password"]);
        }

        $user->update($values);

        return response()->json(["success" => true, "message" => __("user.update_successful")]);
    }

    public function update(Request $request, User $user) {
        $validated = $request->validate([
            "full_name" => "string",
            "phone_country" => "max:4",
            "phone_number" => "numeric|regex:/^[0-9]{1,11}$/",
        ]);

        $user->update($validated);

        return response()->json(["success" => true, "message" => __("user.update_successful")]);
    }

    public function destroy(User $user) {
        $user->delete();

        return response()->json(["success" => true, "message" => "Goodbye"]);
    }
}
?>