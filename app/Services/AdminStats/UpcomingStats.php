<?php 

namespace App\Services\AdminStats;

use App\Models\Appointment;
use Carbon\Carbon;

class UpcomingStats {

    public function summary(Carbon $from, Carbon $to) {
        return [
            "appointments" => $this->upcoming($from, $to),
        ];
    }

    private function upcoming(Carbon $from, Carbon $to) {
        return Appointment::with(["user"])
            ->where(function ($q) use ($from, $to) {
                $q->whereBetween("date", [$from, $to])
                ->where("date", ">", today())
                ->orWhere(function ($q) {
                    $q->where("date", today())
                        ->where("start_at", ">", now()->format("H:i:s"));
                });
            })
            ->whereNull("cancelled_at")
            ->orderBy("date")
            ->orderBy("start_at")
            ->limit(5)
            ->get();
    }
}

?>