<?php 

namespace App\Services;

use App\Models\Appointment;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

use Exception;
use DateTime;
use DateInterval;
use DatePeriod;

class BookingService {

    public function createAppointment(array $data) {
        try {            
            Appointment::create([
                "user_id" => Auth::user()->id,
                "employee_id" => $data["employee_id"],
                "date" => $data["date"],
                "start_at" => $data["start_at"],
                "end_at" => $data["end_at"],
                "comment" => $data["comment"],
                "active" => 1,
            ]);
            return true;
        } catch (Exception $e) {
            Log::error("CreateAppointment error: " . $e->getMessage());
        }
        return false;
    }

    private function sliceInterval($date, $intervalStart, $intervalEnd, $size = 30) {
        $slots = [];
        $start = new DateTime("$date $intervalStart");
        $end = new DateTime("$date $intervalEnd");
        
        $interval = new DateInterval("PT{$size}M");
        $period = new DatePeriod($start, $interval, $end);

        foreach ($period as $dt) {
            $slotStart = $dt;
            $slotEnd = (clone $dt)->add($interval);

            if ($slotEnd > $end) break;

            $slots[] = [
                "date" => $date,
                "start" => $slotStart->format("H:i:s"),
                "end" => $slotEnd->format("H:i:s"),
            ];
        }
        return $slots;
    }

    public function isSlotAvailable(array $data) {
        $check = Appointment::where("employee_id", $data["employee_id"])
            ->where("date", $data["date"])
            ->where("start_at", "<=", $data["start_at"])
            ->where("end_at", ">=", $data["end_at"])
            ->whereNull("cancelled_at")
            ->get();

        return $check->isEmpty();
    }

    public function getFreeSlots($employeeId, $date) {
        $today = new DateTime($date);
        $schedule = Schedule::where("employee_id", $employeeId)
            ->where("day_of_week", $today->format("N") - 1)
            ->first();

        if ($schedule->closed) {
            return [];
        }

        $slots = $this->sliceInterval($today->format("Y-m-d"), $schedule->open_at, $schedule->close_at);
        $free_slots = [];

        foreach ($slots as $slot) {
            $available = $this->isSlotAvailable([
                "employee_id" => $employeeId, 
                "date" => $date, 
                "start_at" => $slot["start"], 
                "end_at" => $slot["end"]
            ]);

            if ($available) {
                $free_slots[] = $slot;
            }
            
        }
        return $free_slots;
    }
}

?>