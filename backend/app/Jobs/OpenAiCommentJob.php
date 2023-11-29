<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Comment;
use App\Services\OpenAiServices;
use Illuminate\Support\Facades\Validator;
use App\Models\Task;
use App\Models\Post;

class OpenAiCommentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $task;
    
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function handle(): void
    {
        try 
        {
            $res = OpenAiServices::ask($this->task->prompt);

            $validator = Validator::make($res, [
                'text_content' => 'required',
            ]);
    
            if ($validator->fails()) {
                throw new \Exception('OpenAi did not return the appropriate field');
            }
    
            $validated = $validator->validated();

            $comment = new Comment;
            $comment->text_content = $validated['text_content'];
            $comment->status = 'active';
            $comment->user_id = $this->task->user_id;
            $comment->post_id = $this->task->parent_id;
            $comment->save();

            $task = Task::find($this->task->id);
            $task->status = 'success';
            $task->created_id = $comment->id;
            $task->message = 'Job was completed successfully.';
            $task->save();
        } 
        catch (\Exception $e) 
        {
            $task = Task::find($this->task->id);
            $task->status = 'failed';
            $task->message = 'Job failed with error message : ' . $e->getMessage();
            $task->save();
        }
    }
}
