<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ProfileController;

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

Route::get('/', function () {
    return view('home');
})->middleware("auth");

Route::get("/admin", function () {
    return view("admin.login");
});

Route::middleware(["auth", "admin"])->group(
    function() {
        Route::get("/admin", function () {
            return view('admin.index');
        });
    }
);

Route::get("/login", function () {
    return view("login");
})->name("login");

Route::post("/login", [LoginController::class, "login"]);

Route::get("/register", function () {
    return view("register");
});

Route::get("/home", function () {
    $user = Auth::user();
    return view("home", compact('user'));
})->middleware('auth')->name('home');

Route::get("/profile/{id}", [ProfileController::class, 'show']);
Route::patch("/profile/{id}/{field}", [ProfileController::class, "partialUpdate"]);
Route::put("profile/{id}", [ProfileController::class, "update"]);
Route::get("users/{id}/appointments", [AppointmentController::class, "getAppointmentsByUser"]);

Route::get("/booking", function () {
    return view("booking");
});

Route::get("/booking/get_free_slots/{date}", [BookingController::class, "getFreeSlots"]);
Route::post("/booking/create_appointment", [BookingController::class, "createAppointment"]);

Route::get("/appointments/get_appointments/{employee_id}/{view}", [AppointmentController::class, "getAppointments"]);
Route::get("/appointments/get_appointment/{id}", [AppointmentController::class, "getAppointment"]);
Route::delete("appointments/delete/{id}", [AppointmentController::class, "deleteAppointment"]);

Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->name('logout');

Route::post("/admin/settings/update_schedule", [ScheduleController::class, "updateSchedule"]);
Route::get("/admin/settings/get_schedule/{employee_id}", [ScheduleController::class, "getSchedule"]);

?>