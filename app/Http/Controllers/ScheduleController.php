<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use DateTime;
use DateInterval;
use DatePeriod;
use Exception;

class ScheduleController extends Controller {

    public function updateSchedule(Request $request) {
        $schedule = Schedule::where("employee_id", $request->input("employee_id"))->get();
        $scheduleData = $request->input("schedule");
        $employeeId = $request->input("employee_id");

        if (count($schedule) != 7) {

            try {
                 $day_of_week = 0;
                foreach ($request->input("schedule") as $day) {
                    Schedule::create([
                        "employee_id" => $employeeId,
                        "day_of_week" => $day_of_week,
                        "open_at" => gmdate("H:i", $day["open_at"]),
                        "close_at" => gmdate("H:i", $day["close_at"]),
                        "closed" => $day["closed"]
                    ]);

                    $day_of_week++;
                }
                return response()->json(["success" => true, "message" => __("schedule.update_successful")]);
            } catch (Exception $e) {
                Log::error("Schedule update error: " . $e->getMessage());
            }
        } else {
            try {
                $day_of_week = 0;
                foreach ($scheduleData as $day) {
                    Schedule::where("employee_id", $employeeId)
                    ->where("day_of_week", $day_of_week)
                    ->update([
                        "open_at" => $day["open_at"],
                        "close_at" => $day["close_at"],
                        "closed" => $day["closed"],
                    ]);

                    $day_of_week++;
                }

                return response()->json(["success" => true, "message" => __("schedule.update_successful")]);
            } catch (Exception $e) {
                Log::error("Schedule update error: " . $e->getMessage());
            }
        }
        return response()->json(["success" => false, "message" => __("schedule.update_error")]);
    }

    public function getSchedule($employeeId) {

        try {
            $schedule = Schedule::where("employee_id", $employeeId)->get();
            return response()->json(["success" => true, "message" => $employeeId, "result" => $schedule]);
        } catch (Exception $e) {
            Log::error("Schedule load: " . $e->getMessage());
        }
        return response()->json(["success" => false, "message" => __("schedule.update_error")]);
    }


    public function getFreeSlots(Request $request) {

        $today = new DateTime();
        $schedule = Schedule::where("employee_id", 1)
            ->where("day_of_week", $today->format("N")-1)
            ->get();

        $slots = $this->sliceInterval($today->format("Y-m-d"), $schedule->open_at, $schedule->close_at);


        return response()->json(["success" => true, "message" => $slots]);
    }
}

?>