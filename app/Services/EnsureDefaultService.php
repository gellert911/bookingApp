<?php

namespace App\Services;

use App\Models\Service;

class EnsureDefaultService {
    public static function ensureDefaultService() {
        Service::firstOrCreate(
            ["is_default" => true],
            [
                "name" => "Default service",
                "price" => 10,
                "active" => true,
                "is_default" => true,
            ]
        );
    }
}

?>