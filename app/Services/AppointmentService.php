<?php

namespace App\Services;

use App\Models\Appointment;

class AppointmentService {

    public function getAppointmentsInRange($employeeId, $start, $end, $view) {
        $appointments = Appointment::where("employee_id", $employeeId)
            ->whereBetween("date", [$start, $end])
            ->get();

        return $appointments;
    }

    public function getAppointmentById($id) {
        $appointment = Appointment::find($id);

        return $appointment;
    }

    public function deleteAppointment($id) {
        $appointment = Appointment::find($id);

        return $appointment->delete();
    }

    public function getActiveAppointmentsByUser($userId) {
        $today = today();
        $activeAppointments = Appointment::where("user_id", $userId)
            ->where("date", ">=", $today)
            ->get();    


        return $activeAppointments;
    }
}

?>