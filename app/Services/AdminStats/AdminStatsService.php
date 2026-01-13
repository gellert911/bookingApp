<?php

namespace App\Services\AdminStats;

use App\Services\AdminStats\TodayStats;

class AdminStatsService {

    public function overview($from, $to) {
        return [
            "today" => app(TodayStats::class)->summary(),
        ];
    }
}

?>