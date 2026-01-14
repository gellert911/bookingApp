<?php

namespace App\Services\AdminStats;

use Illuminate\Support\Facades\DB;
use App\Models\Appointment;
use App\Services\BookingService;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class WeekStats {
    private BookingService $bookingService;

    public function __construct(BookingService $bookingService) {
        $this->bookingService = $bookingService;
    }

    public function summary(Carbon $from, Carbon $to) {
        return [
            "appointments" => $this->appointments($from, $to),
            "cancelled_appointments" => $this->cancelledSlots($from, $to),
            "usage" => $this->usage($from, $to),
            "most_booked_date" => $this->busiestDay($from, $to)
        ];
    }

    private function appointments (Carbon $from, Carbon $to) {
        return Appointment::whereBetween("date", [$from, $to])
            ->whereNull("cancelled_at")
            ->count();
    }

    private function freeSlots(Carbon $from, Carbon $to) {
        $totalSlots = 0;
        $dates = CarbonPeriod::create($from, $to);

        foreach ($dates as $date) {
            $totalSlots += count($this->bookingService->getFreeSlots(1, $date->toDateString()));
        }

        return $totalSlots;
    }

    private function cancelledSlots(Carbon $from, Carbon $to) {
        return Appointment::whereBetween("date", [$from, $to])
            ->whereNotNull("cancelled_at")
            ->count();
    }

    private function usage(Carbon $from, Carbon $to) {
        $bookedSlots = $this->appointments($from, $to);
        $freeSlots = $this->freeSlots($from, $to);

        $total = $bookedSlots + $freeSlots;

        return [
            "percent" => round($total > 0 ? ($bookedSlots/($freeSlots+$bookedSlots)*100): 0),
            "booked" => $bookedSlots,
            "total" => $total,
        ];
    }


    private function busiestDay(Carbon $from, Carbon $to) {
        $mostBookedDay = Appointment::select("date", DB::raw("COUNT(*) as total"))
            ->whereBetween("date", [$from, $to])
            ->whereNull("cancelled_at")
            ->groupBy("date")
            ->orderByDesc("total")
            ->orderBy("date")
            ->first();

        return [
            "date" => $mostBookedDay->date,
            "day" => Carbon::parse($mostBookedDay->date)->format("l"),
            "count" => $mostBookedDay->total,
        ];
    }
       
}

?>