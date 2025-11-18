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

    public function getAppointments(Request $request) {

        $appointments = $this->service->getAppointmentsInRange($request->query("employee_id"), $request->query("start"), $request->query("end"), $request->query("view"));
        return response()->json(["success" => true, "message" => $appointments]);
    }

    public function getAppointment(Request $request) {
        $appointment = $this->service->getAppointmentById($request->route("id"));

        return response()->json(["success" => true, "message" => $appointment]);
    }

    public function getAppointmentsByUser(Request $request, $userId) {
        //$activeAppointments = $this->service->getActiveAppointmentsByUser($userId);
        $user = User::find($userId);

        if ($user) {
            $appointments = $user->appointments()->get();
            return response()->json(["success" => true, "message" => $appointments]);
        }
        return response()->json(["success" => false, "message" => "error"]);
    }

    public function deleteAppointment (Request $request) {
        $delete = $this->service->deleteAppointment($request->route("id"));

        return response()->json(["success" => true, "message" => $delete]);
    }

    public function cancelAppointment(Request $request, $appointmentId) {
        $appointment = Appointment::find($appointmentId);

        if ($appointment) {
            $appointment->cancel();

            return response()->json(["success" => true, "message" => __("booking.appointment_cancelled")]);
        }
    }
}

?>