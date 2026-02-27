<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Database\Eloquent\Relations\Relation;

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

        Relation::enforceMorphMap([
            'user' => \App\Models\User::class,
            'appointment' => \App\Models\Appointment::class,
            'schedule' => \App\Models\Appointment::class,
            'service' => \App\Models\Service::class,
            'user_token' => \App\Models\UserToken::class,
        ]);
    }
}
