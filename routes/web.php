<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LoginController;
use App\Repositories\UserRepository;

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
    return view('dashboard');
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

Route::get("/dashboard", function () {
    $user = Auth::user();
    return view("dashboard", compact('user'));
})->middleware('auth')->name('dashboard');

Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->name('logout');

?>