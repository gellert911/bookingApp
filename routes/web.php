<?php


use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Resource\ScheduleController;
use App\Http\Controllers\Resource\BookingController;
use App\Http\Controllers\User\UserAppointmentController;
use App\Http\Controllers\Resource\AppointmentController;
use App\Http\Controllers\Resource\ProfileController;
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

Route::middleware("web")->group(function () {
    Route::post("/register", [RegisterController::class, "register"]);
    Route::post("/login", [LoginController::class, "login"]);
});

Route::middleware(["web", "auth:sanctum"])->group(function () {
    Route::get("/user", function () {
        $user = auth()->user();

        return response()->json($user);
    });

    Route::get("/profile/{id}", [ProfileController::class, 'show']);
    Route::patch("/profile/{id}", [ProfileController::class, "partialUpdate"]);
    Route::put("profile/{id}", [ProfileController::class, "update"]);
    Route::delete("users/{id}", [ProfileController::class, "delete"]);
    Route::get("users/{user}/appointments", [UserAppointmentController::class, "index"]);

    Route::post("/appointments", [BookingController::class, "store"]);
    Route::get("/appointments", [AppointmentController::class, "index"]);
    Route::get("/appointments/{appointment}", [AppointmentController::class, "show"]);
    Route::delete("/appointments/{appointment}/delete", [AppointmentController::class, "delete"]);
    Route::patch("/appointments/{appointment}/cancel", [AppointmentController::class, "cancel"]);

    Route::post('/logout', function () {
        auth()->guard("web")->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return response()->json(["success" => true]);
    })->name('logout');

    Route::put("/schedules/{employee_id}", [ScheduleController::class, "updateSchedule"]);
    Route::get("/schedules/{employee_id}", [ScheduleController::class, "getSchedule"]);

    Route::post("/services", [ServicesController::class, "store"]);
    Route::put("/services/{service}", [ServicesController::class, "update"]);
    Route::delete("/services/{service}", [ServicesController::class, "destroy"]);

    Route::middleware("admin")->group(function () {
        Route::get("/admin/stats/overview", [AdminStatsController::class, "overview"]);
        Route::get("/audit-logs", [AuditLogController::class, "index"]);
    });

    Route::post("/auth/email/verify/resend", [EmailVerificationController::class, "resend"]);
});



Route::post("/auth/email/verify/", [EmailVerificationController::class, "verify"]);
Route::post("/auth/forgot-password/", [PasswordResetController::class, "send"]);
Route::post("/auth/reset-password/", [PasswordResetController::class, "reset"]);

Route::get("/booking/slots", [BookingController::class, "getFreeSlots"]);

Route::get("/services", [ServicesController::class, "index"]);

Route::get('/{any}', function () {
    return view('layouts.app');
})->where('any', '.*');

?>