<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory, Auditable;

    protected $fillable = [
        "name",
        "price",
        "description",
        "active",
        "is_default",
    ];

    protected $casts = [
        "active" => "boolean",
        "is_default" => "boolean",
    ];
}
