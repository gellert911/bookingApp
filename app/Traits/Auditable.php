<?php

namespace App\Traits;

use App\Observers\AuditObserver;

trait Auditable {
    protected $auditIgnore = ["updated_at", "created_at"];

    public static function bootAuditable() {
        static::observe(AuditObserver::class);
    }

    public function getAuditIgnore() {
        return $this->auditIgnore;
    }
}
?>