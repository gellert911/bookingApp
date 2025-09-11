<?php

namespace App\Http\Controllers;

use App\Services\BookingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Exception;

class BookingController extends Controller {
    private $service;

    public function __construct()
    {
        $this->service = new BookingService;
    }

    public function createAppointment(Request $request) {
        $data = $request->only(["employee_id", "date", "start_at", "end_at"]);

        $validator = Validator::make($data, [
            "start_at" => "required",
            "end_at" => "required",
        ]);

        $validator->after(function ($validator) use (&$data) {
            $data["start_at"] = date("H:i:s", strtotime($data["start_at"]));
            $data["end_at"] = date("H:i:s", strtotime($data["end_at"]));
        });

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => "validalas hiba"]);
        }

        $available = $this->service->isSlotAvailable($data);

        if (!$available) {
            return response()->json(["success" => false, "message" => "Mar letezik"]);
        }

        $created = $this->service->createAppointment($data);

        if ($created) {
            return response()->json(["success" => true, "message" => "Foglalva"]);
        }

        return response()->json(["success" => false, "message" => "Something went wrong."]);
    }

    public function getFreeSlots(Request $request) {
        $slots = $this->service->getFreeSlots(1, date("Y-m-d"));
        if ($slots) {
             return response()->json(["success" => true, "message" => $slots]);
        }
        return response()->json(["success" => false, "message" => ["date" => "2030-05-22", "start" => "01:11", "end" => "22:22"]]);
    }
}
?>