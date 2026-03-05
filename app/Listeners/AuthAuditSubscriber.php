<?php

namespace App\Listeners;

use App\Events\PasswordResetRequested;
use App\Services\AuditService;
use Illuminate\Events\Dispatcher;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\PasswordReset;

class AuthAuditSubscriber
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    private function audit() {
        return app(AuditService::class);
    }

    public function subscribe (Dispatcher $events) {
        return [
            Login::class => "handle",
            Logout::class => "handle",
            Failed::class => "handle",
            PasswordReset::class => "handle",
            PasswordResetRequested::class => "handle",
        ];
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        //
        $user = $event->user ?? "auth";
        $event = match (class_basename($event)) {
            "Login" => "login",
            "Logout" => "logout",
            "Failed" => "failed_login",
            "PasswordReset" => "password_reset",
            "PasswordResetRequested" => "password_reset_requested",
            default => 'unknown',
        };

        $this->audit()->logEvent($user, $event);
        
    }
}
