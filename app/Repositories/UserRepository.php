<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository {

    public function findById ($id) {
            return User::find($id);
    }

    public function findBy ($key, $value) {
        return User::where($key, $value)->first();
    }

    public function create (array $data) {
        return User::create($data);
    }

    public function update ($id, array $data) {
        $user = $this->findById($id);

        if ($user) {
            $user->update($data);
        }

        return $user;
    }
    public function delete ($id) {
        return User::delete($id);
    }
}
?>