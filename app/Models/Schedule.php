<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model {
    use Auditable;
    
    protected $fillable = [
        "employee_id",
        "day_of_week",
        "open_at",
        "close_at",
        "closed",
    ];

}

?>