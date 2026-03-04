<?php

namespace App\Observers;

use App\Services\AuditService;

class AuditObserver
{
    //
    private function audit() {
        return app(AuditService::class);
    }

    public function created($model) {
        $this->audit()->logEvent($model, "created");
    }

    public function updated($model) {
        $this->audit()->logEvent($model, "updated");
    }

    public function deleted($model) {
        $this->audit()->logEvent($model, "deleted");
    }
}
