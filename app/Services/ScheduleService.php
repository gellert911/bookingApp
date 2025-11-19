<?php

namespace App\Services;

use App\Models\Schedule;
use Illuminate\Support\Facades\Log;
use Exception;

class ScheduleService {
    public function getSchedule($employeeId) {
        try {
            $schedule = Schedule::where("employee_id", $employeeId)->get();
            
            if ($schedule->isEmpty()) {
                $schedule = $this->createSchedule($employeeId);
            }

            return $schedule;
        } catch (Exception $e) {
            Log::error("Schedule load: " . $e->getMessage());
        }
        return false;
    }

    private function createSchedule($employeeId, $values = null) {
        try {
            for ($day_of_week=0; $day_of_week<7; $day_of_week++) {
                Schedule::create([
                    "employee_id" => $employeeId,
                    "day_of_week" => $day_of_week,
                    "open_at" => ($values ? $values[$day_of_week]["open_at"]:"08:00"),
                    "close_at" => ($values ? $values[$day_of_week]["close_at"]:"16:00"),
                    "closed" => ($values ? $values[$day_of_week]["closed"]:1),
                ]);
            }
            return Schedule::where("employee_id", $employeeId)->get();
        } catch (Exception $e) {
            Log::error("Schedule create error: " . $e->getMessage());
        }
        return false;
    }


    public function updateSchedule($employeeId, $values) {
         try {
                $day_of_week = 0;
                foreach ($values as $value) {
                    Schedule::where("employee_id", $employeeId)
                    ->where("day_of_week", $day_of_week)
                    ->update([
                        "open_at" => $value["open_at"],
                        "close_at" => $value["close_at"],
                        "closed" => $value["closed"],
                    ]);

                    $day_of_week++;
                }

                return true;
            } catch (Exception $e) {
                Log::error("Schedule update error: " . $e->getMessage());
            }
            return false;
        }
    }

?>