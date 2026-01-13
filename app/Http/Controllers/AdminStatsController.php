<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminStats\AdminStatsService;
use Carbon\Carbon;

class AdminStatsController extends Controller
{
    public function overview(Request $request, AdminStatsService $service) {

        $from = Carbon::parse($request->query("from", now()->startOfDay()));
        $to = Carbon::parse($request->query("to", now()->endOfDay()));

        $overview = $service->overview($from, $to);

        return response()->json(["success" => true, "message" => $overview]);
    }


    //
}

?>