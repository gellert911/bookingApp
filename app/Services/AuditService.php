<?php

namespace App\Services;

use App\Models\AuditLog;

class AuditService {
    public function logEvent($model, $event) {
        $ignore = $model->getAuditIgnore() ?? [];

        $original = $model->getOriginal();
        $changes = $model->getDirty();
        $oldValues = array_intersect_key($original, $changes);

        $oldValues = array_diff_key($oldValues, array_flip($ignore));
        $changes = array_diff_key($changes, array_flip($ignore));
        
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