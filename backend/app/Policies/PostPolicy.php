<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Post;

class PostPolicy
{
    public function destroy(User $user, Post $post)
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $post->user_id;
    }
}
