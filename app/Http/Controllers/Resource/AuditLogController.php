<?php

namespace App\Http\Controllers\Resource;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AuditLog;

class AuditLogController extends Controller
{
    public function index (Request $request) {
        $perPage = $request->get("per_page", 10);
        $auditLogs = AuditLog::paginate($perPage);

        return response()->json(["success" => true, "data" => $auditLogs]);
    }
}
