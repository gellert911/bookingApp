<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LoginController;

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
    return view('welcome');
});

Route::get("/admin", function () {
    return view("admin.login");
});

Route::get("user/{id?}", function ($id = null) {
    return $id ? "Id: $id" : "undefined id";
});

Route::get("/login", function () {
    return view("login");
})->name("login");

Route::get("/register", function () {
    return view("register");
});

Route::get("/dashboard", function () {
    return "cs " . Auth::user();
    //return view("dashboard");
})->middleware('auth')->name('dashboard');

Route::post("/login", [LoginController::class, "login"]);

?>