<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model {
    protected $fillable = [
        "employee_id",
        "day_of_week",
        "open_at",
        "close_at",
        "closed",
    ];

}

?>