<?php

namespace App\Http\Controllers\Resource;

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

    public function update (Request $request, Service $service) {
        $data = $request->validate([
           "name" => "sometimes|required|string",
           "price" => "sometimes|required|integer",
           "description" => "sometimes|string",
           "active" => "sometimes|boolean", 
        ]);

        $service->update($data);

        return response()->json(["success" => true, "message" => __("services.update_success")]);
    }

    public function destroy(Service $service) {
        if ($service->is_default) {
            return response()->json(["success" => false, "message" => __("services.delete_default")], 409);
        }

        $service->delete();

        return response()->json(["success" => true, "message" => __("services.delete_success")]);
    }
}

?>