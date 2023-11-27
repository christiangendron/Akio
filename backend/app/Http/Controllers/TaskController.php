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
use App\Models\Community;
use App\Models\Post;

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
        // TODO Validate that user has enough credit to create task

        $prompt = TaskController::promptGenerator($request);

        $task = new Task;
        $task->type = $request->type;
        $task->parent_id = $request->parent_id;
        $task->prompt = $prompt;
        $task->with_image = $request->with_image ?? false;
        $task->user_id = auth()->user()->id;
        $task->model = $request->model;
        $task->status = 'pending';
        $task->save();

        if ($request->type === 'post') {
            OpenAiPostJob::dispatch($task)->onQueue('openai');
        } else if ($request->type === 'comment') {
            OpenAiCommentJob::dispatch($task)->onQueue('openai');
        } else {
            OpenAiCommunityJob::dispatch($task)->onQueue('openai');
        }
        
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

    private function promptGenerator(TaskRequest $request)
    {
        if ($request->type === 'community') {
            return TaskController::prepCommunityPrompt($request);
        } else if ($request->type === 'post') {
            return TaskController::prepPostPrompt($request);
        } else {
            return TaskController::prepCommentPrompt($request);
        }
    }

    private function prepCommunityPrompt($request)
    {
        $prompt = 'Generate a community with a unique and creative name and description. The name should be catchy, relevant, and appealing to potential users.';

        if ($request->inspiration) {
            $prompt = $prompt . ' On the topic of : ' . $request->inspiration;
        }

        return $prompt;
    }

    private function prepPostPrompt($request)
    {
        $community_name = Community::find($request->parent_id)->name;

        $prompt = 'Generate a post in the style of a Reddit post for this community ' . $community_name;

        if ($request->inspiration) {
            $prompt = $prompt . '. With an emphasis on : ' . $request->inspiration;
        }

        if ($request->with_image) {
            $prompt = $prompt . '. This post will be coupled with an image.';
        } else {
            $prompt = $prompt . '. This post will not contain an image.';
        }

        return $prompt;
    }

    private function prepCommentPrompt($request)
    {
        $post_text_content = Post::find($request->parent_id)->text_content;
            
        $prompt = 'Generate a unique (catchy, relevant) and creative comment for this post' . $post_text_content;

        if ($request->inspiration) {
            $prompt = $prompt . 'With an emphasis on : ' . $request->inspiration;
        }

        return $prompt;
    }
}
