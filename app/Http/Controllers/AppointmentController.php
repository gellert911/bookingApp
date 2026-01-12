<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use App\Services\AppointmentService;
use Illuminate\Http\Request;

class AppointmentController extends Controller {
    private $service;

    public function __construct()
    {
        $this->service = new AppointmentService;
    }

    public function index(Request $request) {

        $appointments = $this->service->getAppointmentsInRange($request->query("employee_id"), $request->query("start"), $request->query("end"), $request->query("view"));
        return response()->json(["success" => true, "message" => $appointments]);
    }

    public function show(Appointment $appointment) {
        return response()->json(["success" => true, "message" => $appointment]);
    }

    public function delete (Appointment $appointment) {
        $appointment->delete();

        return response()->json(["success" => true, "message" => "Appointment deleted."]);
    }

    public function cancel(Appointment $appointment) {
        $appointment->cancel();

        return response()->json(["success" => true, "message" => __("booking.appointment_cancelled")]);
    }
}

?>