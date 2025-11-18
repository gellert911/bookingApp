<?php

namespace App\Http\Controllers;

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

    public function createAppointment(Request $request) {
        $loggedin = Auth::check();

        if (!$loggedin) {
            return response()->json(["success" => false, "message" => __("booking.not_loggedin"), "redirect" => "login"]);
        }

        $data = $request->only(["employee_id", "date", "start_at", "end_at", "comment"]);

        $validator = Validator::make($data, [
            "start_at" => "required",
            "end_at" => "required",
        ]);

        $validator->after(function ($validator) use (&$data) {
            $data["start_at"] = date("H:i:s", strtotime($data["start_at"]));
            $data["end_at"] = date("H:i:s", strtotime($data["end_at"]));
        });

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => __("booking.booking_error")]);
        }

        $available = $this->service->isSlotAvailable($data);

        if (!$available) {
            return response()->json(["success" => false, "message" => __("booking.booking_not_available")]);
        }

        $created = $this->service->createAppointment($data);

        if ($created) {
            return response()->json(["success" => true, "message" => __("booking.booking_successful")]);
        }

        return response()->json(["success" => false, "message" => "booking.booking_error"]);
    }

    public function getFreeSlots(Request $request) {
        $date = $request->query("date");
        
        $slots = $this->service->getFreeSlots(1, $date);
        
        return response()->json(["success" => true, "message" => $slots]);
    }
}
?>