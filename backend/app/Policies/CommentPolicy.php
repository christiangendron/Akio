<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Comment;

class CommentPolicy
{
    public function destroy(User $user, Comment $comment)
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $comment->user_id;
    }
}
