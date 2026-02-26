<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model {
    use Auditable;
    
    protected $fillable = [
        "user_id",
        "employee_id",
        "date",
        "start_at",
        "end_at",
        "service_id",
        "comment",
        "active",
        "cancelled_at"
    ];


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function cancel () {
        $this->cancelled_at = now();
        $this->save();
    }

    public function service() {
        return $this->belongsTo(Service::class);
    }
}

?>