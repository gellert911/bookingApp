<?php

namespace App\Services;

use App\Repositories\AppointmentRepository;

class AppointmentService {
    private $repo;

    public function __construct()
    {
        $this->repo = new AppointmentRepository;
    }

    public function getAppointmentsInRange($employeeId, $start, $end) {
        $appointments = $this->repo->getByEmployeeAndDateRange($employeeId, $start, $end);

        return $appointments;
    }

    public function getAppointmentById($id) {
        $appointment = $this->repo->find($id);

        return $appointment;
    }

    public function deleteAppointment($id) {
        $deleted = $this->repo->delete($id);

        return $deleted;
    }
}

?>