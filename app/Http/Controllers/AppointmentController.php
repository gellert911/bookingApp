<?php

namespace App\Http\Controllers;

use App\Services\AppointmentService;
use Illuminate\Http\Request;

class AppointmentController extends Controller {
    private $service;

    public function __construct()
    {
        $this->service = new AppointmentService;
    }

    public function getAppointments(Request $request) {

        $appointments = $this->service->getAppointmentsInRange($request->route("employee_id"), $request->query("start"), $request->query("end"));
        return response()->json(["success" => true, "message" => $appointments]);
    }
}

?>