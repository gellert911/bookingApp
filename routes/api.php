<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
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
use Illuminate\Auth\Events\Logout;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



