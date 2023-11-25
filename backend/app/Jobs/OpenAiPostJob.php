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

class OpenAiPostJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $prompt;
    protected $post_id;
    protected $with_image;
    
    public function __construct($id, $with_image, $prompt)
    {
        $this->post_id = $id;
        $this->prompt = $prompt;
        $this->with_image = $with_image;
    }

    public function handle(): void
    {
        try 
        {
            $res = OpenAiServices::ask($this->prompt);

            $validator = Validator::make($res, [
                'title' => 'required',
                'text_content' => 'required',
            ]);

            $validated = $validator->validated();

            if ($validator->fails()) {
                throw new \Exception('OpenAi did not return the appropriate field');
            }

            $image = null;

            if ($this->with_image) {
                $imagePrompt = 'Create an fictional image inspired by this message' . $validated['text_content'];
                $image = OpenAiServices::imagine($imagePrompt, "dall-e-3", "512x512");
            }

            $post = Post::find($this->post_id);

            $post->title = $validated['title'];
            $post->text_content = $validated['text_content'];
            $post->media_url = $image;
            $post->status = 'active';
            $post->save();
        } 
        catch (\Exception $e) 
        {
            $post = Post::find($this->post_id);
            $post->title = 'Generation failed';
            $post->text_content = 'With the following error : ' . $e->getMessage();
            $post->status = 'failed';
            $post->save();
        }
    }
}
