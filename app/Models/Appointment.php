<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model {
    protected $fillable = [
        "user_id",
        "employee_id",
        "date",
        "start_at",
        "end_at",
        "active",
    ];


    public function user() {
        return $this->belongsTo(User::class);
    }
}

?>