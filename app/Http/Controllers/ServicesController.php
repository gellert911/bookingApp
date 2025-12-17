<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;

class ServicesController extends Controller {
    public function get (Request $request) {
        $services = Service::all();

        return response()->json(["success" => true, "message" => $services]);
    }
}

?>