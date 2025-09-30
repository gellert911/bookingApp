<?php

namespace App\Repositories;

use App\Models\Appointment;

class AppointmentRepository {

    public function find($id) {
        return Appointment::find($id);
    }

    public function getByUser($user_id) {
        return Appointment::where("user_id", $user_id)->get();
    }

    public function getByEmployee($employee_id) {
        return Appointment::where("employee_id", $employee_id)->get();
    }

    public function getByEmployeeAndDateRange($employeeId, $startDate, $endDate) {
        return Appointment::where("employee_id", $employeeId)
            ->whereBetween("date", [$startDate, $endDate])
            ->get();
    }

    public function getByEmployeeAndTimeRange($employee_id, $date, $start_at, $end_at) {
        return Appointment::where("employee_id", $employee_id)
            ->where("date", $date)
            ->where("start_at", "<=", $start_at)
            ->where("end_at", ">=", $end_at)
            ->get();
    }

    public function create(array $data) {
        return Appointment::create($data);
    }

    public function update ($id, array $data) {
        $appointment = $this->find($id);

        if ($appointment) {
            return $appointment->update($data);
        }
    }

    public function delete ($id) {
        return Appointment::destroy($id);
    }

}

?>