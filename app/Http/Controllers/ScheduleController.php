<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ScheduleRepository;
use Exception;
use Illuminate\Support\Facades\Log;

class ScheduleController extends Controller {

    function updateSchedule(Request $request) {
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

    function getSchedule($employee_id) {
        $repo = new ScheduleRepository;
        
        try {
            $schedule = $repo->getByEmployee($employee_id);
            return response()->json(["success" => true, "message" => $employee_id, "result" => $repo->getByEmployee($employee_id)]);
        } catch (Exception $e) {
            Log::erroer("Schedule load: " . $e->getMessage());
        }
        return response()->json(["success" => false, "message" => __("schedule.update_error")]);
    }
}

?>