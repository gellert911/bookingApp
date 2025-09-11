<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ScheduleRepository;
use Illuminate\Support\Facades\Log;

use DateTime;
use DateInterval;
use DatePeriod;
use Exception;

class ScheduleController extends Controller {

    public function updateSchedule(Request $request) {
        $repo = new ScheduleRepository;
        $schedule = $repo->getByEmployee($request->input("employee_id"));

        if (count($schedule) != 7) {

            try {
                 $day_of_week = 0;
                foreach ($request->input("schedule") as $day) {
                    //return response()->json(["success" => false, "message" => $day["close"]]);
                    $repo->create([
                        "employee_id" => $request->input("employee_id"),
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
                $repo->update($request->input("employee_id"), $request->input("schedule"));

                return response()->json(["success" => true, "message" => __("schedule.update_successful")]);
            } catch (Exception $e) {
                Log::error("Schedule update error: " . $e->getMessage());
            }
        }
        return response()->json(["success" => false, "message" => __("schedule.update_error")]);
    }

    public function getSchedule($employee_id) {
        $repo = new ScheduleRepository;
        
        try {
            $schedule = $repo->getByEmployee($employee_id);
            return response()->json(["success" => true, "message" => $employee_id, "result" => $repo->getByEmployee($employee_id)]);
        } catch (Exception $e) {
            Log::error("Schedule load: " . $e->getMessage());
        }
        return response()->json(["success" => false, "message" => __("schedule.update_error")]);
    }


    public function getFreeSlots(Request $request) {
        $repo = new ScheduleRepository;
        $today = new DateTime();
        $schedule = $repo->getDayScheduleByEmployee(1, ($today->format("N") - 1));

        $slots = $this->sliceInterval($today->format("Y-m-d"), $schedule->open_at, $schedule->close_at);


        return response()->json(["success" => true, "message" => $slots]);
    }
}

?>