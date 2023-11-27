<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\OpenAiServices;
use App\Models\Community;
use Illuminate\Support\Facades\Validator;
use App\Services\ImageServices;
use App\Models\Task;

class OpenAiCommunityJob implements ShouldQueue
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
                'name' => 'required',
                'description' => 'required',
            ]);

            if ($validator->fails()) {
                throw new \Exception('OpenAi did not return the appropriate field');
            }

            $validated = $validator->validated();

            $image = null;

            if ($this->task->with_image) {
                $imagePrompt = 'Create a clean, simple and logo for this community with a strong focus to the center of the image on the following topic :' . $validated['description'];
                $image = OpenAiServices::imagine($imagePrompt, "dall-e-3", "1024x1024");
            }

            $community = new Community;
            $community->name = $validated['name'];
            $community->description = $validated['description'];
            $community->media_url = $image;
            $community->status = 'active';
            $community->user_id = $this->task->user_id;
            $community->save();

            $task = Task::find($this->task->id);
            $task->status = 'success';
            $task->created_id = $community->id;
            $task->error_message = null;
            $task->save();
        } 
        catch (\Exception $e) 
        {
            $task = Task::find($this->task->id);
            $task->status = 'failed';
            $task->error_message = $e->getMessage();
            $task->save();
        }
    }
}
