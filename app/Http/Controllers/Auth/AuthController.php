<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function store (Request $request) {
        $credentials = $request->validate([
            "email" => "required|email",
            "password" => "required",
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                "success" => true, 
                "message" => __("auth.login_success"),
                "user" => Auth::user(),
            ]);
        }

        return response()->json(["success" => false, "message" => __("auth.failed")]);
    }

    public function destroy (Request $request) {
        auth()->guard("web")->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(["success" => true]);
    }
}
