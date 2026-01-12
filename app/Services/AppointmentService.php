<?php

namespace App\Services;

use App\Models\Appointment;

class AppointmentService {

    public function getAppointmentsInRange($employeeId, $start, $end, $view) {
        $appointments = Appointment::with(["user", "service:id,name"])
            ->where("employee_id", $employeeId)
            ->whereBetween("date", [$start, $end])
            ->whereNull("cancelled_at")
            ->get();

        return $appointments;
    }
}

?>