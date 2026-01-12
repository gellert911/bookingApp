<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserAppointmentController extends Controller
{
    public function index (User $user) {
        $appointments = $user->appointments()
            ->with(["service:id,name"])
            ->get();

        return response()->json(["success" => true, "message" => $appointments]);
    }
}
