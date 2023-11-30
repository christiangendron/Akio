<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\OpenAiServices;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use App\Services\ImageServices;
use App\Models\Community;
use App\Models\Task;

class OpenAiPostJob implements ShouldQueue
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
            $task = Task::find($this->task->id);

            $res = OpenAiServices::ask($this->task->prompt);

            $validator = Validator::make($res, [
                'title' => 'required',
                'text_content' => 'required',
            ]);

            $validated = $validator->validated();

            if ($validator->fails()) {
                throw new \Exception('OpenAi did not return the appropriate field');
            }

            $image = null;

            if ($this->task->with_image) {
                $task->message = 'Generating the image...';
                $task->save();

                $imagePrompt = 'Create an fictional image inspired by this message' . $validated['text_content'];
                $image = OpenAiServices::imagine($imagePrompt, "dall-e-3", "1024x1024");
            }

            $post = new Post;
            $post->title = $validated['title'];
            $post->text_content = $validated['text_content'];
            $post->media_url = $image;
            $post->status = 'active';
            $post->user_id = $this->task->user_id;
            $post->community_id = $this->task->parent_id;
            $post->save();

            $task->status = 'success';
            $task->created_id = $post->id;
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
