<?php

namespace App\Services\AdminStats;

use App\Services\AdminStats\TodayStats;
use App\Services\AdminStats\WeekStats;

class AdminStatsService {

    public function overview($from, $to) {
        return [
            "today" => app(TodayStats::class)->summary(),
            "week" => app(WeekStats::class)->summary($from, $to),
        ];
    }
}

?>