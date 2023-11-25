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

class OpenAiCommunityJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $prompt;
    protected $community_id;
    protected $with_image;
    
    public function __construct($id, $with_image, $prompt)
    {
        $this->community_id = $id;
        $this->prompt = $prompt;
        $this->with_image = $with_image;
    }

    public function handle(): void
    {
        try 
        {
            $res = OpenAiServices::ask($this->prompt);

            $validator = Validator::make($res, [
                'name' => 'required',
                'description' => 'required',
            ]);

            if ($validator->fails()) {
                throw new \Exception('OpenAi did not return the appropriate field');
            }

            $validated = $validator->validated();

            $image = null;

            if ($this->with_image) {
                $imagePrompt = 'Create a clean, simple and logo for this community with a strong focus to the center of the image on the following topic :' . $validated['description'];
                $image = OpenAiServices::imagine($imagePrompt, "dall-e-3", "1024x1024");
            }
            
            $community = Community::find($this->community_id);
            $community->name = $validated['name'];
            $community->description = $validated['description'];
            $community->media_url = $image;
            $community->status = 'active';
            $community->save();
        } 
        catch (\Exception $e) 
        { 
            $community = Community::find($this->community_id);
            $community->name = 'Generation failed';
            $community->description = 'With the following error : ' . $e->getMessage();
            $community->media_url = null;
            $community->status = 'failed';
            $community->save();
        }
    }
}
