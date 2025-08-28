<?php

namespace App\Repositories;

use App\Models\Schedule;

class ScheduleRepository {

    public function getByEmployee($employee_id) {
        return Schedule::where("employee_id", $employee_id)->get();
    }

    public function getDayScheduleByEmployee($employee_id, $day_of_week) {
        return Schedule::where("employee_id", $employee_id)->where("day_of_week", $day_of_week)->first();
    }

    public function create(array $data) {
        return Schedule::create($data);
    }

    public function update($employee_id, array $data) {

        $day_of_week = 0;
        foreach ($data as $day) {
            Schedule::where("employee_id", $employee_id)
            ->where("day_of_week", $day_of_week)
            ->update([
                "open_at" => $day["open_at"],
                "close_at" => $day["close_at"],
                "closed" => $day["closed"],
            ]);

            $day_of_week++;
        }
        return true;
    }

    public function delete($employee_id) {
        return Schedule::where("employee_id", $employee_id)->delete();
    }

}


?>