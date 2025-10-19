<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller {
    public function show($id) {
        $repo = new UserRepository;

        $user = $repo->findById($id);

        if ($user) {
            return view('profile', compact('user'));
        }
    }

    public function partialUpdate(Request $request, $id, $field) {
        $repo = new UserRepository;

        // validation
        
        $user = $repo->findById($id);
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
                Log::error("Login error: " . $e->getMessage());
                return response()->json(["success" => false, "message" => __("auth.unknown_error")]);
            }
            return response()->json(["success" => true, "message" => __("user.update_successful")]);
        }
        return response()->json(["success" => false, "message" => __("user.not_exists")]);
    } 
}
?>