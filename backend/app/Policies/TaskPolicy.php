<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Task;

class TaskPolicy
{   
    public function retry(User $user, Task $task)
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $task->user_id;
    }

    public function view(User $user, Task $task)
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $task->user_id;
    }
    
    public function destroy(User $user, Task $task)
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->id === $task->user_id;
    }
}
