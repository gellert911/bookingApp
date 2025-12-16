<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
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
