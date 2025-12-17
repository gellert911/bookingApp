<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table("services")->updateOrInsert(
            ["is_default" => true],

            [
                "name" => "Default service",
                "price" => 10,
                "active" => true,
                "created_at" => now(),
                "updated_at" => now()
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table("services")->where("is_default", true)->delete();
    }
};
