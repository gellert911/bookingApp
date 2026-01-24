<?php

namespace App\Http\Controllers\Resource;

use App\Http\Controllers\Controller;
use App\Services\BookingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use Exception;

class BookingController extends Controller {
    private $service;

    public function __construct()
    {
        $this->service = new BookingService;
    }

    public function store(Request $request) {
        $loggedin = Auth::check();
        $user = $request->user();

        if (!$loggedin) {
            return response()->json(["success" => false, "message" => __("booking.not_loggedin"), "redirect" => "login"], 401);
        }

        if (!$user->verified()) {
            return response()->json(["success" => false, "message" => __("booking.email_not_verified")], 401);
        }

        $data = $request->only(["employee_id", "date", "start_at", "end_at", "service_id", "comment"]);

        $validator = Validator::make($data, [
            "start_at" => "required",
            "end_at" => "required",
            "service_id" => "integer",
            "comment" => "sometimes",
        ]);

        $validator->after(function ($validator) use (&$data) {
            $data["start_at"] = date("H:i:s", strtotime($data["start_at"]));
            $data["end_at"] = date("H:i:s", strtotime($data["end_at"]));
        });

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => __("booking.booking_error")], 422);
        }

        $available = $this->service->isSlotAvailable($data);

        if (!$available) {
            return response()->json(["success" => false, "message" => __("booking.booking_not_available")]);
        }

        $created = $this->service->createAppointment($data);

        if ($created) {
            return response()->json(["success" => true, "message" => __("booking.booking_successful")]);
        }
    }

    public function getFreeSlots(Request $request) {
        $date = $request->query("date");
        
        $slots = $this->service->getFreeSlots(1, $date);
        
        return response()->json(["success" => true, "message" => $slots]);
    }
}
?>