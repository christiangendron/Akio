<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Jobs\OpenAiPostJob;
use App\Jobs\OpenAiCommentJob;
use App\Jobs\OpenAiCommunityJob;

class TaskController extends Controller
{
    public function index()
    {   
        $user = auth()->user();

        $tasks = $user->tasks()->get();

        return TaskResource::collection($tasks);
    }

    public function store(TaskRequest $request)
    {
        // TODO Validate that the user is allowed to generate a new task

        $task = new Task;
        $task->type = $request->type;
        $task->parent_id = $request->parent_id;
        $task->inspiration = $request->inspiration;
        $task->with_image = $request->with_image ?? false;
        $task->user_id = auth()->user()->id;
        $task->model = $request->model;
        $task->status = 'pending';
        $task->save();

        // TODO Implement the job dispatching

        //if ($request->type === 'post') {
        //    OpenAiPostJob::dispatch($task)->onQueue('openai');
        //} else if ($request->type === 'comment') {
        //    OpenAiCommentJob::dispatch($task)->onQueue('openai');
        //} else {
        //    OpenAiCommunityJob::dispatch($task)->onQueue('openai');
        //}
        
        return response()->json(['message' => 'Task created', 'data' => TaskResource::make($task)])->setStatusCode(201);
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);

        return TaskResource::make($task);
    }

    public function destroy(Task $task)
    {
        $this->authorize('destroy', $task);

        $task->delete();

        return response()->json(['message' => 'Task deleted'])->setStatusCode(200);
    }
}
