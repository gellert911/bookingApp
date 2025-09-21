<?php

namespace App\Services;

use App\Repositories\AppointmentRepository;

class AppointmentService {

    public function getAppointmentsInRange($employeeId, $start, $end) {
        $repo = new AppointmentRepository;

        $appointments = $repo->getByEmployeeAndDateRange($employeeId, $start, $end);

        return $appointments;
    }
}

?>