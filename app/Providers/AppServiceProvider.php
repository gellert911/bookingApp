<?php

namespace App\Providers;

use App\Models\Appointment;
use App\Observers\AuditObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use App\Services\EnsureDefaultService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->environment(["production", "dev"])) {
            URL::forceScheme('https');
        }

        //Appointment::observe(AuditObserver::class);
    }
}
