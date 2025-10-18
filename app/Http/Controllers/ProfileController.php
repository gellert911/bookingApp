<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;

class ProfileController extends Controller {
    public function show($id) {
        $repo = new UserRepository;

        $user = $repo->findById($id);

        if ($user) {
            return view('profile', compact('user'));
        }
    }
}
?>