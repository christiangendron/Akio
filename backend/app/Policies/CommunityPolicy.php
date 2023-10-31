<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Community;

class CommunityPolicy
{
    public function destroy(User $user, Community $community): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $community->user_id;
    }
}
