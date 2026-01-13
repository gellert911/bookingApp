<?php 

namespace App\Services\AdminStats;

use App\Models\Appointment;
use App\Services\BookingService;
use Carbon\Carbon;

class TodayStats {

    private BookingService $bookingService;
    private Carbon $date;

    public function __construct(BookingService $bookingService) {
        $this->bookingService = $bookingService;
        $this->date = today();
    }

    public function summary() {
        return [
            "appointments" => $this->appointments(),
            "free_slots" => $this->freeSlots(),
            "cancelled_appointments" => $this->cancelledSlots(),
            "usage" => $this->usage(),
        ];
    }

    private function appointments() {
        return Appointment::whereDate("date", $this->date)
        ->whereNull("cancelled_at")
        ->count();
    }

    private function freeSlots() {
        $totalSlots = count($this->bookingService->getFreeSlots(1, $this->date->toDateString()));

        return $totalSlots;
    }

    private function cancelledSlots() {
        return Appointment::whereDate("date", $this->date)
            ->whereNotNull("cancelled_at")
            ->count();
    }

    private function usage() {
        $bookedSlots = $this->appointments();
        $freeSlots = $this->freeSlots();

        $total = $bookedSlots + $freeSlots;

        if ($total == 0) return 0;

        return (int) round(($bookedSlots/($freeSlots+$bookedSlots))*100);
    }
}

?>