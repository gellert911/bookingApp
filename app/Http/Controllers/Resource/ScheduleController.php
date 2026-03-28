<?php

namespace App\Http\Controllers\Resource;

use App\Models\Schedule;
use App\Http\Controllers\Controller;
use App\Services\ScheduleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use DateTime;
use DateInterval;
use DatePeriod;
use Exception;

class ScheduleController extends Controller {

    private $service;

    public function __construct()
    {
        $this->service = new ScheduleService;
    }

    public function update(Request $request, $employeeId) {
        $schedule = $this->service->updateSchedule($employeeId, $request->input("schedule"));
        
        if($schedule) {
            return response()->json(["success" => true, "message" => __("schedule.update_successful")]);
        }

        return response()->json(["success" => false, "message" => __("schedule.update_error")]);
    }

    public function index($employeeId) {
        $schedule = $this->service->getSchedule($employeeId);
        if ($schedule) {
            return response()->json(["success" => true, "message" => $employeeId, "result" => $schedule]);
        }
        return response()->json(["success" => false, "message" => __("schedule.update_error")]);
    }
}

?>