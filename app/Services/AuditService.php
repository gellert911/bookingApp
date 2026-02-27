<?php

namespace App\Services;

use App\Models\AuditLog;

class AuditService {
    public function logEvent($model, $event) {
        $original = $model->getOriginal();
        $changes = $model->getDirty();
        $oldValues = array_intersect_key($original, $changes);
        
        AuditLog::create([
            "user_id" => auth()->id() ?? null,
            "event" => $event,
            "auditable_type" => $model->getMorphClass(),
            "auditable_id" => $model->getKey(),
            "old_values" => $oldValues,
            "new_values" => $changes,
            "ip" => request()->ip() ?? null,
            "user_agent" => request()->userAgent() ?? null
        ]);
    }
}

?>