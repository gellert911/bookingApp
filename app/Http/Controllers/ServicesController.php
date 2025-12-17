<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServicesController extends Controller {
    public function index (Request $request) {
        $services = Service::all();

        return response()->json(["success" => true, "message" => $services]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            "name" => "required|string", 
            "price" => "required|integer", 
            "description" => "sometimes|string", 
            "active" => "sometimes|boolean",
        ]);

        Service::create($data);

        return response()->json(["success" => true, "message" => __("services.add_success")]);
    }
}

?>