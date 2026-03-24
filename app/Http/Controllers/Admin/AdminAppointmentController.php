<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\User;
use App\Services\BookingService;
use Illuminate\Http\Request;

class AdminAppointmentController extends Controller
{   
    private BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function store(Request $request) {
        $validated = $request->validate([
            "email" => "required|email",
            "employee_id" => "required",
            "date" => "required|date_format:Y-m-d",
            "start_at" => "required|date_format:H:i:s",
            "end_at" => "required|date_format:H:i:s",
            "service_id" => "required|integer",
            "comment" => "sometimes",
        ]);

        $user = User::where("email", $request->email)->first();

        if (!$user) {
            return response()->json(["success" => false, "message" => __("user.not_exists")]);
        }

        $available = $this->bookingService->isSlotAvailable($validated);

        if (!$available) {
            return response()->json(["success" => false, "message" => __("booking.booking_not_available")]);
        }

        Appointment::create([
            "user_id" => $user->id,
            ...$validated
        ]);

        return response()->json(["success" => true, "message" => __("booking.admin_appointment_successful")]);
    }
}
