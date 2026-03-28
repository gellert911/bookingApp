<?php

use App\Http\Controllers\Admin\AdminAppointmentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Resource\ScheduleController;
use App\Http\Controllers\Resource\BookingController;
use App\Http\Controllers\User\UserAppointmentController;
use App\Http\Controllers\Resource\AppointmentController;
use App\Http\Controllers\Resource\UserController;
use App\Http\Controllers\Resource\ServicesController;
use App\Http\Controllers\Admin\AdminStatsController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Resource\AuditLogController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Auth\Events\Logout;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(["web", "throttle:5,1"])->group(function () {
    Route::post("/users", [UserController::class, "store"]);
    Route::post("/login", [AuthController::class, "store"]);

    Route::post("/auth/email/verify", [EmailVerificationController::class, "verify"]);
    Route::post("/auth/forgot-password", [PasswordResetController::class, "send"]);
    Route::post("/auth/reset-password", [PasswordResetController::class, "reset"]);
});

Route::middleware(["web", "auth:sanctum", "throttle:50,1"])->group(function () {
    Route::get("/user", [UserController::class, "me"]);
    Route::post('/logout', [AuthController::class, "destroy"]);

    Route::get("/users/{user}", [UserController::class, 'show']);
    Route::patch("/users/{user}", [UserController::class, "partialUpdate"]);
    Route::put("users/{user}", [UserController::class, "update"]);
    Route::delete("users/{user}", [UserController::class, "destroy"]);
    Route::get("users/{user}/appointments", [UserAppointmentController::class, "index"]);

    Route::post("/appointments", [BookingController::class, "store"]);
    Route::get("/appointments", [AppointmentController::class, "index"]);
    Route::get("/appointments/{appointment}", [AppointmentController::class, "show"]);
    Route::delete("/appointments/{appointment}/delete", [AppointmentController::class, "delete"]);
    Route::patch("/appointments/{appointment}/cancel", [AppointmentController::class, "cancel"]);

    Route::put("/schedules/{employee_id}", [ScheduleController::class, "update"]);
    Route::get("/schedules/{employee_id}", [ScheduleController::class, "index"]);

    Route::post("/services", [ServicesController::class, "store"]);
    Route::put("/services/{service}", [ServicesController::class, "update"]);
    Route::delete("/services/{service}", [ServicesController::class, "destroy"]);

    Route::middleware("admin")->group(function () {
        Route::get("/admin/stats/overview", [AdminStatsController::class, "overview"]);
        Route::get("/audit-logs", [AuditLogController::class, "index"]);
        Route::post("/admin/appointments", [AdminAppointmentController::class, "store"]);
    });

    Route::post("/auth/email/verify/resend", [EmailVerificationController::class, "resend"]);
});

Route::get("/booking/slots", [BookingController::class, "index"]);
Route::get("/services", [ServicesController::class, "index"]);

Route::get('/{any}', function () {
    return view('layouts.app');
})->where('any', '.*');

?>